# ============================================================
# NEW PROJECT INITIALIZER
# ============================================================
# Usage:
#   1. Copy this entire starter-kit folder to your new project location
#   2. Run: .\init.ps1
#   3. Provide project details when prompted
#   4. Follow the remaining setup steps
# ============================================================

param(
    [string]$ProjectId = "",
    [string]$ProjectName = "",
    [string]$GitHubUser = "",
    [string]$GitHubRepo = "",
    [string]$Region = "us-central1"
)

$ErrorActionPreference = "Stop"

Write-Host "`n=== NEW PROJECT INITIALIZER ===" -ForegroundColor Cyan
Write-Host "This script sets up a complete Lovable + GitHub + Firebase + Antigravity project.`n"

# --- Collect info ---
if (-not $ProjectId) { $ProjectId = Read-Host "GCP/Firebase Project ID (e.g., my-app-prod)" }
if (-not $ProjectName) { $ProjectName = Read-Host "Display Name (e.g., My App)" }
if (-not $GitHubUser) { $GitHubUser = Read-Host "GitHub username (e.g., YuryZZZ)" }
if (-not $GitHubRepo) { $GitHubRepo = Read-Host "GitHub repo name (e.g., my-app)" }

Write-Host "`nConfig:" -ForegroundColor Yellow
Write-Host "  Project ID:   $ProjectId"
Write-Host "  Display Name: $ProjectName"
Write-Host "  GitHub:       $GitHubUser/$GitHubRepo"
Write-Host "  Region:       $Region`n"

$confirm = Read-Host "Proceed? (y/n)"
if ($confirm -ne "y") { Write-Host "Aborted."; exit 0 }

# --- Step 1: Replace placeholders in all files ---
Write-Host "`n[1/8] Replacing placeholders..." -ForegroundColor Green

$files = Get-ChildItem -Recurse -File -Exclude "init.ps1","*.exe","*.zip" |
    Where-Object { $_.Extension -in ".json", ".md", ".ps1", ".ts", ".js", ".yml", ".yaml", ".py", ".txt", ".html", ".css", ".tsx", ".jsx", ".mjs", ".cjs", ".env", ".rc" -or $_.Name -eq ".firebaserc" }

foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue
    if ($content) {
        $updated = $content `
            -replace "YOUR_GCP_PROJECT_ID", $ProjectId `
            -replace "YOUR_PROJECT_ID", $ProjectId `
            -replace "YOUR_PROJECT_NAME", $ProjectName `
            -replace "YOUR_USER", $GitHubUser `
            -replace "YOUR_REPO", $GitHubRepo `
            -replace "YOUR_REGION", $Region
        if ($updated -ne $content) {
            Set-Content $f.FullName $updated
            Write-Host "  Updated: $($f.Name)"
        }
    }
}

# --- Step 2: Auth check ---
Write-Host "`n[2/8] Checking authentication..." -ForegroundColor Green

$gcloudAuth = gcloud auth list --format="value(account)" 2>$null | Select-Object -First 1
if ($gcloudAuth) {
    Write-Host "  GCP:      $gcloudAuth"
} else {
    Write-Host "  GCP:      NOT LOGGED IN - run: gcloud auth login" -ForegroundColor Red
}

$firebaseAuth = firebase login:list 2>$null | Select-Object -First 1
if ($firebaseAuth) {
    Write-Host "  Firebase: logged in"
} else {
    Write-Host "  Firebase: NOT LOGGED IN - run: firebase login" -ForegroundColor Red
}

# --- Step 3: Create GCP project ---
Write-Host "`n[3/8] Creating GCP project..." -ForegroundColor Green
$existingProject = gcloud projects describe $ProjectId 2>$null
if ($existingProject) {
    Write-Host "  Project $ProjectId already exists, skipping creation."
} else {
    gcloud projects create $ProjectId --name="$ProjectName" 2>&1
    Write-Host "  Created project: $ProjectId"
}
gcloud config set project $ProjectId
gcloud config set compute/region $Region

# --- Step 4: Enable APIs ---
Write-Host "`n[4/8] Enabling GCP APIs..." -ForegroundColor Green
gcloud services enable `
    run.googleapis.com `
    cloudbuild.googleapis.com `
    artifactregistry.googleapis.com `
    firestore.googleapis.com `
    firebase.googleapis.com `
    --project=$ProjectId 2>&1

# --- Step 5: Firebase setup ---
Write-Host "`n[5/8] Setting up Firebase..." -ForegroundColor Green
firebase projects:addfirebase $ProjectId 2>&1
firebase apps:create WEB "$ProjectName Dashboard" --project $ProjectId 2>&1

# --- Step 6: Git init ---
Write-Host "`n[6/8] Initializing Git..." -ForegroundColor Green
if (-not (Test-Path ".git")) {
    git init
    git branch -M master
}
git remote remove origin 2>$null
git remote add origin "https://github.com/$GitHubUser/$GitHubRepo.git"

# --- Step 7: Install frontend deps ---
Write-Host "`n[7/8] Setting up frontend..." -ForegroundColor Green
if (Test-Path "web/package.json") {
    Push-Location web
    npm install 2>&1
    Pop-Location
}

# --- Step 8: Install test deps ---
Write-Host "`n[8/8] Setting up parallel test runner..." -ForegroundColor Green
if (Test-Path "ui/package.json") {
    Push-Location ui
    npm install 2>&1
    Pop-Location
}

# --- Done ---
Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "  PROJECT INITIALIZED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "============================================"
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Create the GitHub repo:  https://github.com/new"
Write-Host "  2. Push:                    git add -A && git commit -m 'feat: initial setup' && git push -u origin master"
Write-Host "  3. Build frontend:          cd web && npm run build && cd .."
Write-Host "  4. Deploy:                  npx firebase-tools deploy --only hosting --project $ProjectId"
Write-Host "  5. Open in Antigravity and start coding!"
Write-Host ""
Write-Host "Your site will be live at: https://$ProjectId.web.app"
Write-Host ""
