# Security Policy

## Supported Versions

Security fixes are intended for the latest public release of Kernel Breach. Older releases may remain available for historical download, but players should update to the newest release before reporting an issue that may already be fixed.

## Reporting A Vulnerability

Please report security issues privately to the project maintainer before opening a public issue. Include:

- the affected release version
- your operating system
- steps to reproduce
- any relevant save file, updater output, or screenshot

Do not include private signing keys, access tokens, passwords, or other secrets in a report.

## Threat Model

Kernel Breach is a local, single-player Electron game. Normal gameplay is intended to run locally and does not contact the internet from inside the game runtime.

The renderer receives game frames from the local runtime and renders terminal-style ANSI output. Renderer HTML escaping is intended to make runtime/player-controlled text display as text instead of executable markup while preserving ANSI styling.

Packaged releases are intended to use Electron hardening appropriate for this project, including context isolation, disabled Node integration, and renderer sandboxing.

## Save-File Trust Model

Save files are local files, but they are treated as untrusted input. The game validates and normalizes save data before loading it into live game state. Corrupted or invalid saves should not crash the game or partially load unsafe state.

Local save editing for personal cheating or experimentation is not considered a security vulnerability unless it crosses a trust boundary or causes code execution, privilege escalation, or unsafe behavior outside the edited local game state.

## Updater Trust Model

Updater scripts are optional and are separate from normal gameplay. They contact GitHub Releases to check for and download the latest platform release asset.

Updater scripts verify downloaded release assets with signed SHA256 checksum files before installing or replacing anything. Missing checksum files, missing signatures, signature failures, or hash mismatches are expected to abort the update.

Players who do not want to use the updater path can manually download release packages from GitHub Releases.

## Out Of Scope

The following are generally out of scope unless they cross a privilege or trust boundary:

- cheating by editing local save files
- modifying local game files to break personal gameplay
- issues requiring an already fully compromised host
- unsupported third-party repackaged builds
- denial of service caused only by intentionally deleting or corrupting local files
