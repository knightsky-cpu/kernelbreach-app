#!/usr/bin/env bash
set -euo pipefail

REPO="knightsky-cpu/kernelbreach-app"
ASSET_NAME="kernelbreach-linux-x64.deb"
CHECKSUMS_NAME="SHA256SUMS"
CHECKSUMS_SIG_NAME="SHA256SUMS.minisig"
MINISIGN_PUBLIC_KEY="${KERNELBREACH_MINISIGN_PUBLIC_KEY:-RWRg56ToZFyQ7H4pwaCMib4dBi8uLzBqpfLQcYg7hePzcSyJEjDNsIIU}"
PACKAGE_NAME="kernelbreach"
VERSION_DIR="${HOME}/.kernelbreach"
VERSION_FILE="${VERSION_DIR}/release-tag-linux64"

info() {
  printf '[Kernel Breach updater] %s\n' "$*"
}

fail() {
  printf '[Kernel Breach updater] ERROR: %s\n' "$*" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing required command: $1"
}

latest_release_json() {
  curl -fsSL -H "Accept: application/vnd.github+json" "https://api.github.com/repos/${REPO}/releases/latest"
}

json_tag_name() {
  sed -n 's/^[[:space:]]*"tag_name":[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1
}

json_asset_url() {
  local asset_name="$1"
  awk -v asset="$asset_name" '
    /^[[:space:]]*"name":[[:space:]]*"/ {
      name=$0
      sub(/^.*"name":[[:space:]]*"/, "", name)
      sub(/".*$/, "", name)
    }
    /^[[:space:]]*"browser_download_url":[[:space:]]*"/ && name == asset {
      url=$0
      sub(/^.*"browser_download_url":[[:space:]]*"/, "", url)
      sub(/".*$/, "", url)
      print url
      exit
    }
  '
}

verify_minisign_key_configured() {
  [[ -n "$MINISIGN_PUBLIC_KEY" ]] || fail "Updater verification public key is not configured."
}

download_asset() {
  local release_json="$1"
  local asset_name="$2"
  local output_path="$3"
  local url
  url="$(printf '%s\n' "$release_json" | json_asset_url "$asset_name")"
  [[ -n "$url" ]] || fail "Could not find release asset: $asset_name"
  info "Downloading ${asset_name}..."
  curl -fL "$url" -o "$output_path"
}

verify_downloaded_artifact() {
  local artifact_path="$1"
  local checksums_path="$2"
  local signature_path="$3"
  info "Verifying signed checksum manifest..."
  minisign -Vm "$checksums_path" -x "$signature_path" -P "$MINISIGN_PUBLIC_KEY" >/dev/null
  info "Verifying ${ASSET_NAME} SHA256..."
  local expected_hash
  expected_hash="$(awk -v asset="$ASSET_NAME" '$2 == asset { print $1; exit }' "$checksums_path")"
  [[ -n "$expected_hash" ]] || fail "${ASSET_NAME} is not listed in ${CHECKSUMS_NAME}."
  local actual_hash
  actual_hash="$(sha256sum "$artifact_path" | awk '{ print $1 }')"
  [[ "$actual_hash" == "$expected_hash" ]] || fail "SHA256 mismatch for ${ASSET_NAME}."
}

info "Checking required tools..."
require_command curl
require_command sudo
require_command dpkg
require_command minisign
require_command sha256sum
verify_minisign_key_configured

info "Checking latest Kernel Breach release..."
release_json="$(latest_release_json)"
latest_tag="$(printf '%s\n' "$release_json" | json_tag_name)"
current_tag="$(cat "$VERSION_FILE" 2>/dev/null || true)"

[[ -n "$latest_tag" ]] || fail "Could not determine latest release tag."
[[ -n "$(printf '%s\n' "$release_json" | json_asset_url "$ASSET_NAME")" ]] || fail "Could not find release asset: $ASSET_NAME"

if [[ "$current_tag" == "$latest_tag" ]]; then
  info "Kernel Breach is already up to date (${latest_tag})."
  exit 0
fi

tmp_dir="$(mktemp -d /tmp/kernelbreach-update.XXXXXX)"
trap 'rm -rf "$tmp_dir"' EXIT

deb_path="${tmp_dir}/${ASSET_NAME}"
checksums_path="${tmp_dir}/${CHECKSUMS_NAME}"
signature_path="${tmp_dir}/${CHECKSUMS_SIG_NAME}"
info "Preparing update to ${latest_tag}."
download_asset "$release_json" "$ASSET_NAME" "$deb_path"
download_asset "$release_json" "$CHECKSUMS_NAME" "$checksums_path"
download_asset "$release_json" "$CHECKSUMS_SIG_NAME" "$signature_path"
verify_downloaded_artifact "$deb_path" "$checksums_path" "$signature_path"

if dpkg-query -s "$PACKAGE_NAME" >/dev/null 2>&1; then
  info "Removing existing Kernel Breach package..."
  sudo dpkg -r "$PACKAGE_NAME"
  info "Purging old package configuration..."
  sudo dpkg --purge "$PACKAGE_NAME"
fi

info "Installing fresh package..."
sudo dpkg -i "$deb_path"

mkdir -p "$VERSION_DIR"
printf '%s\n' "$latest_tag" > "$VERSION_FILE"
info "Kernel Breach updated to ${latest_tag}."
