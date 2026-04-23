#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

usage() {
  cat <<'EOF'
Usage: ./linuxrelease.sh [tag]

Build the Linux x64 .deb release artifact and upload it to the current GitHub release.

If no tag is provided, the script uses v<package.json version>.
If the release already exists for that tag, assets are replaced in that release.
If the release does not exist, it is created automatically.
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" || "${1:-}" == "help" ]]; then
  usage
  exit 0
fi

APP_VERSION="$(node -p "JSON.parse(require('fs').readFileSync('package.json','utf8')).version")"
RELEASE_TAG="${1:-v$APP_VERSION}"
RELEASE_TITLE="Kernel Breach ${RELEASE_TAG}"
ZIP_ASSET_NAME="kernelbreach-linux-x64.zip"

require_command() {
  local cmd="$1"
  command -v "$cmd" >/dev/null 2>&1 || {
    echo "Missing required command: $cmd" >&2
    exit 1
  }
}

check_prereqs() {
  require_command node
  require_command npm
  require_command gh
  require_command zip

  gh auth status >/dev/null 2>&1 || {
    echo "GitHub CLI is not authenticated. Run: gh auth login -h github.com -p ssh -w -s repo" >&2
    exit 1
  }
}

clean_release() {
  rm -rf app-release
  mkdir -p app-release
}

require_share_files() {
  [[ -f README.txt ]] || { echo "Missing README.txt" >&2; exit 1; }
  [[ -f login.txt ]] || { echo "Missing login.txt" >&2; exit 1; }
}

create_share_zip() {
  local zip_name="$1"
  local artifact_path="$2"
  local output_dir="$3"
  local stage_dir

  [[ -e "$artifact_path" ]] || {
    echo "Missing build artifact: $artifact_path" >&2
    exit 1
  }

  mkdir -p "$output_dir"
  stage_dir="$(mktemp -d "$output_dir/share.XXXXXX")"
  cp "$artifact_path" "$stage_dir/"
  cp README.txt login.txt "$stage_dir/"
  (
    cd "$stage_dir"
    zip -qr "../$zip_name" .
  )
  rm -rf "$stage_dir"
}

package_share_zip() {
  local artifact_path="$1"
  local output_dir="$2"
  require_share_files
  create_share_zip "$ZIP_ASSET_NAME" "$artifact_path" "$output_dir"
}

build_local_variant() {
  npm exec electron-builder -- \
    --linux dir \
    --x64 \
    -c.extraMetadata.kernelBreach.devMenuEnabled=true
}

build_public_variant() {
  local output_dir="$1"

  npm exec electron-builder -- \
    --linux deb \
    --x64 \
    -c.directories.output="$output_dir" \
    -c.extraMetadata.kernelBreach.devMenuEnabled=false
}

ensure_release() {
  local err_file
  err_file="$(mktemp)"

  if gh release view "$RELEASE_TAG" >/dev/null 2>"$err_file"; then
    rm -f "$err_file"
    return 0
  fi

  if ! grep -Eqi 'not[ -]?found|404' "$err_file"; then
    cat "$err_file" >&2
    rm -f "$err_file"
    echo "Failed to check GitHub release state for ${RELEASE_TAG}" >&2
    exit 1
  fi

  rm -f "$err_file"
  gh release create "$RELEASE_TAG" \
    --title "$RELEASE_TITLE" \
    --notes "Automated Linux app release for Kernel Breach."
}

upload_assets() {
  local zip_asset="$1"
  gh release upload "$RELEASE_TAG" \
    "$zip_asset" \
    --clobber
}

check_prereqs
clean_release
build_local_variant

PUBLIC_STAGE_DIR="$(mktemp -d /tmp/kernelbreach-linux-release.XXXXXX)"
trap 'rm -rf "$PUBLIC_STAGE_DIR"' EXIT
PUBLIC_DEB_ARTIFACT="${PUBLIC_STAGE_DIR}/kernelbreach_${APP_VERSION}_amd64.deb"
PUBLIC_ZIP_ASSET="${PUBLIC_STAGE_DIR}/${ZIP_ASSET_NAME}"

build_public_variant "$PUBLIC_STAGE_DIR"
package_share_zip "$PUBLIC_DEB_ARTIFACT" "$PUBLIC_STAGE_DIR"
ensure_release
upload_assets "$PUBLIC_ZIP_ASSET"

echo "Uploaded Linux release asset to ${RELEASE_TAG}"
