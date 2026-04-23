#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

usage() {
  cat <<'EOF'
Usage: ./build.sh [all|mac|mac-arm64|mac-x64|win|linux|clean]

Build Electron app packages for Kernel Breach.

Targets:
  all        Clean app-release and build macOS arm64, macOS x64, Windows x64, and Linux x64
  mac        Clean app-release and build macOS arm64 and macOS x64 packages
  mac-arm64  Clean app-release and build macOS arm64 packages
  mac-x64    Clean app-release and build macOS x64 packages
  win    Build Windows x64 packages
  linux  Build Linux x64 package
  clean  Remove existing app-release artifacts only
EOF
}

target="${1:-all}"
APP_VERSION="$(node -p "JSON.parse(require('fs').readFileSync('package.json','utf8')).version")"
HOST_OS="$(uname -s)"

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
  local stage_dir

  [[ -e "$artifact_path" ]] || return 0

  stage_dir="$(mktemp -d app-release/share.XXXXXX)"
  cp "$artifact_path" "$stage_dir/"
  cp README.txt login.txt "$stage_dir/"
  (
    cd "$stage_dir"
    zip -qr "../$zip_name" .
  )
  rm -rf "$stage_dir"
}

package_share_zips() {
  require_share_files

  create_share_zip "kernelbreach-macos-arm64.zip" "app-release/Kernel Breach-${APP_VERSION}-arm64.dmg"
  create_share_zip "kernelbreach-macos-x64.zip" "app-release/Kernel Breach-${APP_VERSION}.dmg"
  create_share_zip "kernelbreach-win-x64.zip" "app-release/Kernel Breach Setup ${APP_VERSION}.exe"
  create_share_zip "kernelbreach-linux-x64.zip" "app-release/kernelbreach_${APP_VERSION}_amd64.deb"
}

cleanup_raw_artifacts() {
  find app-release -mindepth 1 -maxdepth 1 \
    ! -name 'kernelbreach-*.zip' \
    ! -name 'mac-arm64' \
    -exec rm -rf {} +
}

build_linux_package() {
  if [[ "$HOST_OS" != "Linux" ]]; then
    echo "Linux .deb builds must be run on a Linux x64 machine. Skipping Linux package on $HOST_OS." >&2
    return 1
  fi
  npm run dist:app:linux
}

case "$target" in
  all)
    clean_release
    npm run dist:app:mac
    npm run dist:app:mac:x64
    npm run dist:app:win
    if [[ "$HOST_OS" == "Linux" ]]; then
      build_linux_package
    else
      echo "Skipping Linux .deb build on $HOST_OS. Run ./build.sh linux on a Linux x64 machine." >&2
    fi
    package_share_zips
    cleanup_raw_artifacts
    ;;
  mac)
    clean_release
    npm run dist:app:mac
    npm run dist:app:mac:x64
    package_share_zips
    cleanup_raw_artifacts
    ;;
  mac-arm64)
    clean_release
    npm run dist:app:mac
    package_share_zips
    cleanup_raw_artifacts
    ;;
  mac-x64)
    clean_release
    npm run dist:app:mac:x64
    package_share_zips
    cleanup_raw_artifacts
    ;;
  win)
    clean_release
    npm run dist:app:win
    package_share_zips
    cleanup_raw_artifacts
    ;;
  linux)
    clean_release
    build_linux_package
    package_share_zips
    cleanup_raw_artifacts
    ;;
  clean)
    clean_release
    ;;
  -h|--help|help)
    usage
    ;;
  *)
    echo "Unknown target: $target" >&2
    usage >&2
    exit 1
    ;;
esac
