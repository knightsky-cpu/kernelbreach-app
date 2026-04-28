$ErrorActionPreference = "Stop"

$Repo = "knightsky-cpu/kernelbreach-app"
$AssetName = "kernelbreach-win-x64.exe"
$ChecksumsName = "SHA256SUMS"
$ChecksumsSigName = "SHA256SUMS.minisig"
$MinisignPublicKey = if ($env:KERNELBREACH_MINISIGN_PUBLIC_KEY) { $env:KERNELBREACH_MINISIGN_PUBLIC_KEY } else { "RWRxNr1zm5N4U9r7LLrM7SJzAQnAUCAhDGhY0btcYYsLHkCCa7mqhY4l" }
$VersionDir = Join-Path $env:APPDATA "KernelBreach"
$VersionFile = Join-Path $VersionDir "release-tag-win64.txt"
$ApiUrl = "https://api.github.com/repos/$Repo/releases/latest"
$ScriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$BundledMinisign = Join-Path $ScriptDir "minisign.exe"
$MinisignCommand = $null

function Write-Info {
  param([string]$Message)
  Write-Host "[Kernel Breach updater] $Message"
}

function Fail {
  param([string]$Message)
  throw "[Kernel Breach updater] ERROR: $Message"
}

function Require-Command {
  param([string]$CommandName)
  if (-not (Get-Command $CommandName -ErrorAction SilentlyContinue)) {
    Fail "Missing required command: $CommandName"
  }
}

function Resolve-Minisign {
  if (Test-Path $BundledMinisign) {
    Write-Info "Using bundled minisign.exe."
    return $BundledMinisign
  }
  $systemMinisign = Get-Command "minisign" -ErrorAction SilentlyContinue
  if ($systemMinisign) {
    Write-Info "Using system minisign."
    return $systemMinisign.Source
  }
  Fail "Missing minisign verifier. Use the Windows release zip, which includes minisign.exe, or install minisign with Scoop or Chocolatey: scoop install minisign OR choco install minisign"
}

function Get-ReleaseAsset {
  param(
    [object]$Release,
    [string]$Name
  )
  $asset = $Release.assets | Where-Object { $_.name -eq $Name } | Select-Object -First 1
  if (-not $asset) {
    Fail "Could not find release asset: $Name"
  }
  return $asset
}

function Download-Asset {
  param(
    [object]$Asset,
    [string]$OutputPath
  )
  Write-Info "Downloading $($Asset.name)..."
  Invoke-WebRequest -Uri $Asset.browser_download_url -OutFile $OutputPath
}

function Verify-DownloadedArtifact {
  param(
    [string]$ArtifactPath,
    [string]$ChecksumsPath,
    [string]$SignaturePath
  )
  Write-Info "Verifying signed checksum manifest..."
  & $MinisignCommand -Vm $ChecksumsPath -x $SignaturePath -P $MinisignPublicKey | Out-Null
  if ($LASTEXITCODE -ne 0) {
    Fail "Signature verification failed for $ChecksumsName."
  }

  Write-Info "Verifying $AssetName SHA256..."
  $checksumLine = Get-Content $ChecksumsPath | Where-Object { $_ -match ("^[A-Fa-f0-9]{64}\s+" + [regex]::Escape($AssetName) + "$") } | Select-Object -First 1
  if (-not $checksumLine) {
    Fail "$AssetName is not listed in $ChecksumsName."
  }
  $expectedHash = ($checksumLine -split "\s+")[0].ToLowerInvariant()
  $actualHash = (Get-FileHash -Algorithm SHA256 -Path $ArtifactPath).Hash.ToLowerInvariant()
  if ($actualHash -ne $expectedHash) {
    Fail "SHA256 mismatch for $AssetName."
  }
}

Write-Info "Checking required tools..."
$MinisignCommand = Resolve-Minisign
if (-not $MinisignPublicKey) {
  Fail "Updater verification public key is not configured."
}

Write-Info "Checking latest Kernel Breach release..."
$release = Invoke-RestMethod -Uri $ApiUrl -Headers @{ "Accept" = "application/vnd.github+json" }
$latestTag = $release.tag_name
$asset = Get-ReleaseAsset -Release $release -Name $AssetName
$checksumsAsset = Get-ReleaseAsset -Release $release -Name $ChecksumsName
$signatureAsset = Get-ReleaseAsset -Release $release -Name $ChecksumsSigName

if (-not $latestTag) {
  Fail "Could not determine latest release tag."
}

$currentTag = ""
if (Test-Path $VersionFile) {
  $currentTag = (Get-Content $VersionFile -Raw).Trim()
}

if ($currentTag -eq $latestTag) {
  Write-Info "Kernel Breach is already up to date ($latestTag)."
  exit 0
}

$tempDir = Join-Path $env:TEMP ("kernelbreach-update-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tempDir | Out-Null
$installerPath = Join-Path $tempDir $AssetName
$checksumsPath = Join-Path $tempDir $ChecksumsName
$signaturePath = Join-Path $tempDir $ChecksumsSigName

try {
  Write-Info "Preparing update to $latestTag."
  Download-Asset -Asset $asset -OutputPath $installerPath
  Download-Asset -Asset $checksumsAsset -OutputPath $checksumsPath
  Download-Asset -Asset $signatureAsset -OutputPath $signaturePath
  Verify-DownloadedArtifact -ArtifactPath $installerPath -ChecksumsPath $checksumsPath -SignaturePath $signaturePath

  Write-Info "Launching installer..."
  $process = Start-Process -FilePath $installerPath -Wait -PassThru
  if ($process.ExitCode -ne 0) {
    Fail "Installer exited with code $($process.ExitCode)."
  }

  New-Item -ItemType Directory -Path $VersionDir -Force | Out-Null
  Set-Content -Path $VersionFile -Value $latestTag
  Write-Info "Kernel Breach updated to $latestTag."
}
finally {
  Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}
