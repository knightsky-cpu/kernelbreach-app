#!/usr/bin/env bash
set -e

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

info()    { echo -e "${CYAN}[INFO]${RESET}  $*"; }
success() { echo -e "${GREEN}[OK]${RESET}    $*"; }
warn()    { echo -e "${YELLOW}[WARN]${RESET}  $*"; }
error()   { echo -e "${RED}[ERROR]${RESET} $*" >&2; }
header()  { echo -e "\n${BOLD}${CYAN}$*${RESET}\n"; }

# ── Header ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}  Kernel Breach — Setup Script${RESET}"
echo -e "${CYAN}  A Terminal Security RPG${RESET}"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GAME_FILE="$SCRIPT_DIR/dist/game.mjs"

# ── OS Detection ──────────────────────────────────────────────────────────────
OS="$(uname -s)"
header "Detecting environment..."

case "$OS" in
  Darwin)
    info "macOS detected."
    PLATFORM="macos"
    ;;
  Linux)
    info "Linux detected."
    PLATFORM="linux"
    ;;
  *)
    error "Unsupported OS: $OS. Only macOS and Linux are supported."
    exit 1
    ;;
esac

# ── Node.js Version Check ─────────────────────────────────────────────────────
MIN_NODE_MAJOR=18

check_node_version() {
  if command -v node &>/dev/null; then
    NODE_VERSION="$(node --version 2>/dev/null | sed 's/v//')"
    NODE_MAJOR="$(echo "$NODE_VERSION" | cut -d. -f1)"
    if [ "$NODE_MAJOR" -ge "$MIN_NODE_MAJOR" ] 2>/dev/null; then
      success "Node.js $NODE_VERSION found — meets requirement (>= v${MIN_NODE_MAJOR})."
      return 0
    else
      warn "Node.js $NODE_VERSION found but v${MIN_NODE_MAJOR}+ is required."
      return 1
    fi
  fi
  return 1
}

# ── Install Node.js ───────────────────────────────────────────────────────────
install_node_macos() {
  header "Installing Node.js on macOS..."

  if command -v brew &>/dev/null; then
    info "Homebrew found. Installing Node.js via Homebrew..."
    brew install node
  else
    info "Homebrew not found. Installing Homebrew first..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    # Add Homebrew to PATH for Apple Silicon
    if [ -f "/opt/homebrew/bin/brew" ]; then
      eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
    info "Installing Node.js via Homebrew..."
    brew install node
  fi
}

install_node_linux() {
  header "Installing Node.js on Linux..."

  if command -v apt-get &>/dev/null; then
    info "Detected apt (Debian/Ubuntu). Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs

  elif command -v dnf &>/dev/null; then
    info "Detected dnf (Fedora/RHEL). Installing Node.js..."
    sudo dnf install -y nodejs

  elif command -v yum &>/dev/null; then
    info "Detected yum (CentOS/RHEL). Installing Node.js..."
    curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
    sudo yum install -y nodejs

  elif command -v pacman &>/dev/null; then
    info "Detected pacman (Arch/Manjaro). Installing Node.js..."
    sudo pacman -Sy --noconfirm nodejs npm

  elif command -v zypper &>/dev/null; then
    info "Detected zypper (openSUSE). Installing Node.js..."
    sudo zypper install -y nodejs20

  elif command -v apk &>/dev/null; then
    info "Detected apk (Alpine). Installing Node.js..."
    sudo apk add --no-cache nodejs npm

  else
    warn "Could not detect a supported package manager."
    install_node_via_nvm
  fi
}

install_node_via_nvm() {
  info "Falling back to NVM (Node Version Manager)..."
  if ! command -v nvm &>/dev/null; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    # shellcheck source=/dev/null
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  fi
  nvm install 20
  nvm use 20
}

# ── Main Install Flow ─────────────────────────────────────────────────────────
if ! check_node_version; then
  if [ "$PLATFORM" = "macos" ]; then
    install_node_macos
  else
    install_node_linux
  fi

  # Re-check after install
  if ! check_node_version; then
    # Try sourcing shell profile in case PATH wasn't updated
    for profile in "$HOME/.bashrc" "$HOME/.zshrc" "$HOME/.profile"; do
      [ -f "$profile" ] && source "$profile" 2>/dev/null || true
    done
    if ! check_node_version; then
      error "Node.js installation completed but 'node' command still not found."
      error "Please restart your terminal and run: node $GAME_FILE"
      exit 1
    fi
  fi
fi

# ── Verify Game File ──────────────────────────────────────────────────────────
header "Verifying game files..."

if [ ! -f "$GAME_FILE" ]; then
  error "Game file not found: $GAME_FILE"
  error "The dist/game.mjs file is missing. Please re-download Kernel Breach."
  exit 1
fi

success "Game file found: dist/game.mjs"

# ── Create play.sh Launcher ───────────────────────────────────────────────────
LAUNCHER="$SCRIPT_DIR/play.sh"
cat > "$LAUNCHER" <<'LAUNCHEREOF'
#!/usr/bin/env bash
SOURCE="${BASH_SOURCE[0]}"
while [ -L "$SOURCE" ]; do
  DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
cd "$DIR" || exit 1
exec node "dist/game.mjs" "$@"
LAUNCHEREOF
chmod +x "$LAUNCHER"
success "Created launcher: play.sh"

# ── Global Command: kernelbreach ─────────────────────────────────────────────
header "Installing global 'kernelbreach' command..."

LOCAL_BIN="$HOME/.local/bin"
SYMLINK="$LOCAL_BIN/kernelbreach"

# Create ~/.local/bin if it doesn't exist
if [ ! -d "$LOCAL_BIN" ]; then
  mkdir -p "$LOCAL_BIN"
  info "Created $LOCAL_BIN"
fi

# Remove any existing symlink/file at that path
if [ -e "$SYMLINK" ] || [ -L "$SYMLINK" ]; then
  rm -f "$SYMLINK"
fi

OLD_SYMLINK="$LOCAL_BIN/terminalquest"
if [ -e "$OLD_SYMLINK" ] || [ -L "$OLD_SYMLINK" ]; then
  rm -f "$OLD_SYMLINK"
  info "Removed legacy terminalquest command"
fi

ln -s "$LAUNCHER" "$SYMLINK"
success "Symlink created: $SYMLINK → $LAUNCHER"

# ── Ensure ~/.local/bin is in PATH ────────────────────────────────────────────
PATH_LINE='export PATH="$HOME/.local/bin:$PATH"'
PATH_ADDED=false

add_to_profile() {
  local profile="$1"
  if [ -f "$profile" ] && ! grep -qF '.local/bin' "$profile"; then
    echo "" >> "$profile"
    echo "# Added by Kernel Breach setup" >> "$profile"
    echo "$PATH_LINE" >> "$profile"
    success "Added ~/.local/bin to PATH in $profile"
    PATH_ADDED=true
  fi
}

# Detect current shell and target the right profile
CURRENT_SHELL="$(basename "${SHELL:-bash}")"

case "$CURRENT_SHELL" in
  zsh)
    add_to_profile "$HOME/.zshrc"
    add_to_profile "$HOME/.zprofile"
    ;;
  bash)
    if [ "$PLATFORM" = "macos" ]; then
      add_to_profile "$HOME/.bash_profile"
    fi
    add_to_profile "$HOME/.bashrc"
    ;;
  fish)
    FISH_CONFIG="$HOME/.config/fish/config.fish"
    if [ -f "$FISH_CONFIG" ] && ! grep -qF '.local/bin' "$FISH_CONFIG"; then
      echo "" >> "$FISH_CONFIG"
      echo "# Added by Kernel Breach setup" >> "$FISH_CONFIG"
      echo 'fish_add_path "$HOME/.local/bin"' >> "$FISH_CONFIG"
      success "Added ~/.local/bin to PATH in $FISH_CONFIG"
      PATH_ADDED=true
    fi
    ;;
  *)
    add_to_profile "$HOME/.profile"
    ;;
esac

# Also check if it's already in PATH right now
if echo "$PATH" | grep -q "$LOCAL_BIN"; then
  success "~/.local/bin is already active in this session."
  PATH_ACTIVE=true
else
  # Export for the remainder of this script session
  export PATH="$LOCAL_BIN:$PATH"
  PATH_ACTIVE=false
fi

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}  Setup complete!${RESET}"
echo ""
echo -e "  Run the game from ${BOLD}anywhere${RESET} with:"
echo -e "    ${BOLD}${CYAN}kernelbreach${RESET}"
echo ""

if [ "$PATH_ACTIVE" = false ]; then
  echo -e "  ${YELLOW}To activate the command in your current terminal, run:${RESET}"
  echo -e "    ${BOLD}source ~/.bashrc${RESET}   ${YELLOW}# or ~/.zshrc, ~/.bash_profile — whichever applies${RESET}"
  echo -e "  ${YELLOW}New terminal windows will have it automatically.${RESET}"
  echo ""
fi

echo -e "  Requires a terminal at least ${BOLD}120 columns wide${RESET}."
echo -e "  Press ${BOLD}CTRL+C${RESET} to quit the game at any time."
echo ""
