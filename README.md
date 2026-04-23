# Kernel Breach

Kernel Breach is a desktop app build of the game using Electron. This repo is for the standalone application version, not the older terminal-only release flow.

## Requirements

- Node.js 18 or newer
- npm
- macOS for macOS builds
- Linux x64 for Linux `.deb` builds

Windows packages can be produced from this repo with Electron Builder, but Linux `.deb` packages should be built on Linux.

## Run The App From Source

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

That builds the app packages supported by the current machine and creates final share zips in `app-release/`.

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

## Platform Notes

- macOS builds are produced on macOS.
- Windows x64 builds are produced with Electron Builder from this repo.
- Linux `.deb` builds should be produced on a Linux x64 machine.

The Linux package is intended to be installed with:

```bash
sudo dpkg -i kernelbreach_1.0.0_amd64.deb
```

## Build Output

Final distributable share zips are written to `app-release/`:

- `kernelbreach-macos-arm64.zip`
- `kernelbreach-macos-x64.zip`
- `kernelbreach-win-x64.zip`
- `kernelbreach-linux-x64.zip`

The macOS arm64 unpacked app bundle is also preserved in:

- `app-release/mac-arm64/Kernel Breach.app`

## Repo Notes

This repo contains the Electron app source, assets, icons, packaging config, and build script. Generated dependency folders and packaged build output should not be committed.

## License

Kernel Breach is released under the BSD 3-Clause License. See `LICENSE` for the full text.
