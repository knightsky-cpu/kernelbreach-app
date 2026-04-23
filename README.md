# Kernel Breach

Kernel Breach is released under the BSD 3-Clause License. See `LICENSE` for the full text.

Welcome to Kernel Breach, a hacker themed, Pokemon inspired, dungeon crawling creature capture RPG packed with security flavored mechanics, grindy progression, and just enough difficulty to be frustrating in the right way.

Behind every corner are surprises, hostile viruses, and corrupted sectors waiting to be purged. You are the lead Security Architect, tasked with stopping a deadly polymorphic code that has breached the kernel and now threatens to wipe the entire system with `sudo rm -rf /`.

Armed with sudo permissions and exploits of your own, you enter the world of the Terminal, where users meet machine and mysterious low-level operations unfold beneath the surface of the User Space. At first it may feel like magic, but the deeper you dive, the more systematic and scientific the journey becomes.

Explore the infected sectors of the disk, purge the polymorphic corruption spreading through them, and reclaim the system before it is lost forever!

## Setup

Requirements:

- Node.js 18 or newer
- npm
- macOS for macOS builds
- Linux x64 for Linux `.deb` builds

From the project root:

```bash
npm install
npm run start:app
```

## Build Packages

Use the build wrapper from the project root:

```bash
./build.sh
```

Supported targets:

```bash
./build.sh all
./build.sh mac
./build.sh mac-arm64
./build.sh mac-x64
./build.sh win
./build.sh linux
./build.sh clean
```

Windows packages can be produced from this repo with Electron Builder, but Linux `.deb` packages should be built on Linux.

The Linux package is intended to be installed with:

```bash
sudo dpkg -i kernelbreach_1.0.0_amd64.deb
```

## Controls

- WASD or arrow keys: move
- E: interact / enter dungeon
- M: menu
- I: inventory
- Enter or Space: confirm
- X or Escape: back
- CTRL+C: quit

## Notes

- Save files are written to an OS-specific app data folder.
- macOS: `~/Library/Application Support/KernelBreach/saved_games`
- Linux: `${XDG_DATA_HOME:-~/.local/share}/KernelBreach/saved_games`
- Windows: `%APPDATA%\KernelBreach\saved_games`
