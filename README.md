# Kernel Breach

Kernel Breach can be installed in two ways.

If you want the script-based setup, use `setup.sh`. This is the preferred method for running the game from source on macOS or Linux. The script checks for Node.js 18 or newer, installs it if needed, creates a local launcher, and sets up a `kernelbreach` command you can run from your terminal.

If you do not want to run the source version, you can use one of the prebuilt zip releases instead. These are packaged builds for supported platforms and can be downloaded directly from the repository releases or from the `release` folder when included in the repo.

## Source Setup

Run the setup script from the project directory:

```bash
bash setup.sh
```

After the script finishes, you can start the game with:

```bash
kernelbreach
```

If you are still in the project directory, you can also run:

```bash
./play.sh
```

This setup method is intended for macOS and Linux.

## Prebuilt Zip Files

If you want a packaged build instead of the source setup, use the zip file that matches your system.

Current zip builds:

`release/kernelbreach-macos-arm64.zip`
`release/kernelbreach-macos-x64.zip`
`release/kernelbreach-linux-x64.zip`
`release/kernelbreach-win-x64.zip`

Download the correct zip for your platform, extract it, and run the included binary from the extracted folder.

## License

Kernel Breach is released under the BSD 3-Clause License. See `LICENSE` for the full text.
