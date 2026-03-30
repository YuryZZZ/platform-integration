# Lovable → Project Sync Bridge
# Pulls design output from Lovable's GitHub repo into the main project
# Run after Lovable generates new UI components

param(
    [string]$LovableRepo = "",
    [string]$TargetDir = "",
    [string]$ProjectRepo = "",
    [switch]$AutoCommit
)

$ErrorActionPreference = "Stop"

# --- Resolve paths ---
if (-not $LovableRepo) {
    $LovableRepo = Read-Host "Path to Lovable repo (e.g., C:\Projects\lovable-ui)"
}
if (-not $ProjectRepo) {
    # Default to parent of this script's directory
    $ProjectRepo = (Get-Item $PSScriptRoot).Parent.FullName
    Write-Host "Using project repo: $ProjectRepo" -ForegroundColor DarkGray
}
if (-not $TargetDir) {
    $TargetDir = Join-Path $ProjectRepo "static\lovable-designs"
}

Write-Host "`n🎨 Lovable → Project Sync Bridge" -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor DarkGray
Write-Host "  Lovable:  $LovableRepo"
Write-Host "  Target:   $TargetDir"
Write-Host "  Project:  $ProjectRepo"
Write-Host ""

# Pull latest from Lovable repo
if (Test-Path "$LovableRepo\.git") {
    Write-Host "📥 Pulling latest Lovable changes..." -ForegroundColor Cyan
    git -C $LovableRepo pull origin main 2>$null
    git -C $LovableRepo pull origin master 2>$null
}

# Create target directory
if (!(Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
    Write-Host "📁 Created $TargetDir" -ForegroundColor Green
}

# Sync src/ components from Lovable
$srcDir = "$LovableRepo\src"
if (Test-Path $srcDir) {
    Write-Host "📂 Syncing Lovable src/ → lovable-designs/" -ForegroundColor Yellow
    Copy-Item -Path "$srcDir\*" -Destination $TargetDir -Recurse -Force
    Write-Host "✅ Synced src/ components" -ForegroundColor Green
}

# Sync public assets
$publicDir = "$LovableRepo\public"
if (Test-Path $publicDir) {
    $assetsTarget = "$TargetDir\public"
    if (!(Test-Path $assetsTarget)) { New-Item -ItemType Directory -Path $assetsTarget -Force | Out-Null }
    Copy-Item -Path "$publicDir\*" -Destination $assetsTarget -Recurse -Force
    Write-Host "✅ Synced public/ assets" -ForegroundColor Green
}

# Sync the HTML design
$htmlFile = "$LovableRepo\minimal_app.html"
if (Test-Path $htmlFile) {
    Copy-Item -Path $htmlFile -Destination "$TargetDir\lovable_design.html" -Force
    Write-Host "✅ Synced minimal_app.html → lovable_design.html" -ForegroundColor Green
}

# Auto-commit if requested
if ($AutoCommit) {
    Set-Location $ProjectRepo
    git add static/lovable-designs/
    $status = git status --porcelain -- static/lovable-designs/
    if ($status) {
        git commit -m "design: sync Lovable UI updates $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        git push origin master
        Write-Host "🚀 Pushed Lovable designs to project repo" -ForegroundColor Green
    }
    else {
        Write-Host "ℹ️ No new Lovable changes to sync" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "✅ Sync complete! Lovable designs are now in $TargetDir" -ForegroundColor Green
