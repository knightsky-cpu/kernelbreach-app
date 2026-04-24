#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if [[ "$(git branch --show-current)" != "linux-dev" ]]; then
  echo "linuxpush.sh only pushes from the linux-dev branch." >&2
  exit 1
fi

MESSAGE="${1:-Update linux-dev}"

git add -A

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git commit -m "$MESSAGE"
git push origin linux-dev
