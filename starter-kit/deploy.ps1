# deploy.ps1 - One-click deploy to production
# Launched by deploy.bat
# ---------------------------------------------------------------

$ErrorActionPreference = 'Stop'
$Root   = $PSScriptRoot
$WebDir = Join-Path $Root 'web'

# Get commit message
$Msg = Read-Host 'Commit message (press Enter for "deploy: update")'
if (-not $Msg) { $Msg = 'deploy: update' }

Write-Host ''
Write-Host '=============================================================' -ForegroundColor Cyan
Write-Host '  DEPLOY - verifying before push...' -ForegroundColor Cyan
Write-Host '============================================================='

# ── Step 1: TypeScript ────────────────────────────────────────
Write-Host ''
Write-Host '[1/4] TypeScript check...'
if (Test-Path $WebDir) {
    Push-Location $WebDir
    $ErrorActionPreference = 'Continue'
    $result = & npx tsc --noEmit 2>&1
    $ErrorActionPreference = 'Stop'
    if ($LASTEXITCODE -ne 0) {
        Write-Host '' 
        Write-Host 'ERROR: TypeScript errors. Fix before deploying:' -ForegroundColor Red
        $result | ForEach-Object { Write-Host "  $_" }
        Pop-Location
        Read-Host 'Press Enter to exit'
        exit 1
    }
    Write-Host '  PASS - no TypeScript errors' -ForegroundColor Green
    Pop-Location
}

# ── Step 2: Build ─────────────────────────────────────────────
Write-Host ''
Write-Host '[2/4] Build check...'
if (Test-Path $WebDir) {
    Push-Location $WebDir
    $ErrorActionPreference = 'Continue'
    $result = & npm run build 2>&1
    $ErrorActionPreference = 'Stop'
    if ($LASTEXITCODE -ne 0) {
        Write-Host ''
        Write-Host 'ERROR: Build failed:' -ForegroundColor Red
        $result | Select-Object -Last 20 | ForEach-Object { Write-Host "  $_" }
        Pop-Location
        Read-Host 'Press Enter to exit'
        exit 1
    }
    Write-Host '  PASS - build succeeded' -ForegroundColor Green
    Pop-Location
}

# ── Step 3: Push to GitHub ────────────────────────────────────
Write-Host ''
Write-Host '[3/4] Pushing to GitHub (triggers Firebase auto-deploy)...'
Push-Location $Root
git add -A
git commit -m $Msg
git push origin master
if ($LASTEXITCODE -ne 0) {
    Write-Host 'ERROR: Push failed. Check: git remote -v' -ForegroundColor Red
    Pop-Location
    Read-Host 'Press Enter to exit'
    exit 1
}
Write-Host '  Pushed - Firebase App Hosting building now...' -ForegroundColor Green
Pop-Location

# ── Step 4: Open Firebase ─────────────────────────────────────
Write-Host ''
Write-Host '[4/4] Opening Firebase to watch deploy...'

# Get Firebase project ID from .env.local
$FirebaseId = ''
$EnvFile = Join-Path $WebDir '.env.local'
if (Test-Path $EnvFile) {
    $line = Get-Content $EnvFile | Where-Object { $_ -match 'NEXT_PUBLIC_FIREBASE_PROJECT_ID=' } | Select-Object -First 1
    if ($line) { $FirebaseId = $line.Split('=')[1].Trim() }
}

if ($FirebaseId) {
    Start-Process "https://console.firebase.google.com/project/$FirebaseId/apphosting"
} else {
    Start-Process 'https://console.firebase.google.com'
}

Write-Host ''
Write-Host '=============================================================' -ForegroundColor Green
Write-Host '  DEPLOY TRIGGERED' -ForegroundColor Green
Write-Host '============================================================='
Write-Host ''
Write-Host '  Firebase App Hosting is building your site.'
Write-Host '  Typical time: 2-3 minutes'
if ($FirebaseId) {
    Write-Host "  Live URL: https://$FirebaseId.web.app"
}
Write-Host ''
Write-Host '  NOTE: First deploy requires Firebase App Hosting to be'
Write-Host '  connected to GitHub in the Firebase console (2 min one-time).'
Write-Host ''
