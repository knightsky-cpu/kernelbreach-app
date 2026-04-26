$ErrorActionPreference = "Stop"

$Repo = "knightsky-cpu/kernelbreach-app"
$AssetName = "kernelbreach-win-x64.exe"
$VersionDir = Join-Path $env:APPDATA "KernelBreach"
$VersionFile = Join-Path $VersionDir "release-tag-win64.txt"
$ApiUrl = "https://api.github.com/repos/$Repo/releases/latest"

Write-Host "Checking latest Kernel Breach release..."
$release = Invoke-RestMethod -Uri $ApiUrl -Headers @{ "Accept" = "application/vnd.github+json" }
$latestTag = $release.tag_name
$asset = $release.assets | Where-Object { $_.name -eq $AssetName } | Select-Object -First 1

if (-not $latestTag) {
  throw "Could not determine latest release tag."
}

if (-not $asset) {
  throw "Could not find release asset: $AssetName"
}

$currentTag = ""
if (Test-Path $VersionFile) {
  $currentTag = (Get-Content $VersionFile -Raw).Trim()
}

if ($currentTag -eq $latestTag) {
  Write-Host "Kernel Breach is already up to date ($latestTag)."
  exit 0
}

$tempDir = Join-Path $env:TEMP ("kernelbreach-update-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tempDir | Out-Null
$installerPath = Join-Path $tempDir $AssetName

try {
  Write-Host "Downloading Kernel Breach $latestTag..."
  Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $installerPath

  Write-Host "Launching installer..."
  $process = Start-Process -FilePath $installerPath -Wait -PassThru
  if ($process.ExitCode -ne 0) {
    throw "Installer exited with code $($process.ExitCode)."
  }

  New-Item -ItemType Directory -Path $VersionDir -Force | Out-Null
  Set-Content -Path $VersionFile -Value $latestTag
  Write-Host "Kernel Breach updated to $latestTag."
}
finally {
  Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}
