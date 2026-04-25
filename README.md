# Kernel Breach

Kernel Breach is released under the BSD 3-Clause License. See `LICENSE` for the full text.

Welcome to Kernel Breach, a hacker themed, Pokemon inspired, dungeon crawling creature capture RPG packed with security flavored mechanics, grindy progression, and just enough difficulty to be frustrating in the right way.

Behind every corner are surprises, hostile viruses, and corrupted sectors waiting to be purged. You are the lead Security Architect, tasked with stopping a deadly polymorphic code that has breached the kernel and now threatens to wipe the entire system with `sudo rm -rf /`.

Armed with sudo permissions and exploits of your own, you enter the world of the Terminal, where users meet machine and mysterious low-level operations unfold beneath the surface of the User Space. At first it may feel like magic, but the deeper you dive, the more systematic and scientific the journey becomes.

Explore the infected sectors of the disk, purge the polymorphic corruption spreading through them, and reclaim the system before it is lost forever!

## Download And Play

Prebuilt packages are available from the Releases section of this repository.

Use the package for your operating system:

- macOS: download the `.dmg` or release zip, move the app to Applications if desired, then launch Kernel Breach.
- Windows: download the Windows release zip, extract it, then run the included `.exe` or installer.
- Linux: download the `.deb` package, install it with your system package tools, then launch Kernel Breach from the applications menu.

For Linux `.deb` packages, the install command is:

```bash
sudo dpkg -i kernelbreach_1.0.0_amd64.deb
```

This public repository is intended for players who want to inspect the game or use the official release builds.

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
