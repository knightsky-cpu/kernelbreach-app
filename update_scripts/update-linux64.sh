#!/usr/bin/env bash
set -euo pipefail

REPO="knightsky-cpu/kernelbreach-app"
ASSET_NAME="kernelbreach-linux-x64.deb"
PACKAGE_NAME="kernelbreach"
VERSION_DIR="${HOME}/.kernelbreach"
VERSION_FILE="${VERSION_DIR}/release-tag-linux64"

require_command() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing required command: $1" >&2
    exit 1
  }
}

latest_release_json() {
  curl -fsSL -H "Accept: application/vnd.github+json" "https://api.github.com/repos/${REPO}/releases/latest"
}

json_tag_name() {
  sed -n 's/^[[:space:]]*"tag_name":[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1
}

json_asset_url() {
  awk -v asset="$ASSET_NAME" '
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

require_command curl
require_command sudo
require_command dpkg

release_json="$(latest_release_json)"
latest_tag="$(printf '%s\n' "$release_json" | json_tag_name)"
download_url="$(printf '%s\n' "$release_json" | json_asset_url)"
current_tag="$(cat "$VERSION_FILE" 2>/dev/null || true)"

[[ -n "$latest_tag" ]] || { echo "Could not determine latest release tag." >&2; exit 1; }
[[ -n "$download_url" ]] || { echo "Could not find release asset: $ASSET_NAME" >&2; exit 1; }

if [[ "$current_tag" == "$latest_tag" ]]; then
  echo "Kernel Breach is already up to date (${latest_tag})."
  exit 0
fi

tmp_dir="$(mktemp -d /tmp/kernelbreach-update.XXXXXX)"
trap 'rm -rf "$tmp_dir"' EXIT

deb_path="${tmp_dir}/${ASSET_NAME}"
echo "Downloading Kernel Breach ${latest_tag}..."
curl -fL "$download_url" -o "$deb_path"

if dpkg-query -s "$PACKAGE_NAME" >/dev/null 2>&1; then
  echo "Removing existing Kernel Breach package..."
  sudo dpkg -r "$PACKAGE_NAME"
  echo "Purging old package configuration..."
  sudo dpkg --purge "$PACKAGE_NAME"
fi

echo "Installing fresh package..."
sudo dpkg -i "$deb_path"

mkdir -p "$VERSION_DIR"
printf '%s\n' "$latest_tag" > "$VERSION_FILE"
echo "Kernel Breach updated to ${latest_tag}."
