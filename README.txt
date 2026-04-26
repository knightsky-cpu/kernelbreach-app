KERNEL BREACH

Welcome to Kernel Breach, a hacker themed, Pokemon inspired, dungeon crawling creature capture RPG packed with security flavored mechanics, grindy progression, and just enough difficulty to be frustrating in the right way.
 
Behind every corner are surprises, hostile viruses, and corrupted sectors waiting to be purged. You are the lead Security Architect, tasked with stopping a deadly polymorphic code that has breached the kernel and now threatens to wipe the entire system with sudo rm -rf /.

Armed with sudo permissions and exploits of your own, you enter the world of the Terminal, where users meet machine and mysterious low-level operations unfold beneath the surface of the User Space. At first it may feel like magic, but the deeper you dive, the more systematic and scientific the journey becomes.
 
Explore the infected sectors of the disk, purge the polymorphic corruption spreading through them, and reclaim the system before it is lost forever!

How to run:
- macOS: open the .dmg or release zip, move the app to Applications if desired, then launch Kernel Breach.app.
- Windows: open the release zip, extract it, then run the included .exe or installer.
- Linux: install the .deb package with sudo dpkg -i kernelbreach_1.0.0_amd64.deb, then launch Kernel Breach from the applications menu.

Updating:
- Kernel Breach does not auto-update or access the internet from inside the game.
- Optional updater scripts are available in the update_scripts folder of the public repository.
- macOS Apple Silicon: ./update_scripts/update-mac-arm64.sh
- macOS Intel: ./update_scripts/update-mac-x64.sh
- Linux x64: ./update_scripts/update-linux64.sh
- Windows x64: powershell -ExecutionPolicy Bypass -File .\update_scripts\update-win64.ps1
- The updater checks the latest GitHub release and exits if you are already current.
- Save files are stored separately from the app and are not removed by updating.

Controls:
- WASD or arrow keys: move
- E: interact / enter dungeon
- M: menu
- I: inventory
- Enter or Space: confirm
- X or Escape: back
- CTRL+C: quit

Notes:
- Save files are written to an OS-specific app data folder:
- macOS: ~/Library/Application Support/KernelBreach/saved_games
- Linux: ${XDG_DATA_HOME:-~/.local/share}/KernelBreach/saved_games
- Windows: %APPDATA%\KernelBreach\saved_games
