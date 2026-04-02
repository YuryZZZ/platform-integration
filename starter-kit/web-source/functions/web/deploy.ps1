#!/usr/bin/env pwsh
# ============================================================
# Nexus AI Platform — Production Deploy Script
# Usage: .\functions\web\deploy.ps1 [-Prod] [-SkipBuild]
# ============================================================
param(
  [switch]$Prod,         # Deploy to production (default: preview)
  [switch]$SkipBuild,    # Skip local build check
  [string]$ProjectName = "nexus-ai-platform"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$ROOT = Resolve-Path "$PSScriptRoot\..\.."

function Log-Info  { param($msg) Write-Host "  [INFO] $msg" -ForegroundColor Cyan }
function Log-Ok    { param($msg) Write-Host "    [OK] $msg" -ForegroundColor Green }
function Log-Warn  { param($msg) Write-Host "  [WARN] $msg" -ForegroundColor Yellow }
function Log-Error { param($msg) Write-Host " [ERROR] $msg" -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  Nexus AI — Deploy Pipeline" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

# ─── 1. PREFLIGHT ────────────────────────────────────────────
Log-Info "Running preflight checks..."

# Check .env.local exists
if (-not (Test-Path "$ROOT\.env.local")) {
  Log-Error ".env.local not found. Copy .env.example and fill in secrets."
}
Log-Ok ".env.local present"

# Check required env vars
$envContent = Get-Content "$ROOT\.env.local" -Raw
foreach ($key in @("DATABASE_URL", "AUTH_SECRET", "GLM_API_KEY")) {
  if ($envContent -notmatch "$key=.+") {
    Log-Warn "$key not set in .env.local — some features may not work"
  } else {
    Log-Ok "$key configured"
  }
}

# Check Node version
$nodeVersion = node --version 2>&1
Log-Ok "Node: $nodeVersion"

# Check Vercel CLI
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
  Log-Info "Installing Vercel CLI..."
  npm install -g vercel --silent
  Log-Ok "Vercel CLI installed"
} else {
  Log-Ok "Vercel CLI: $(vercel --version 2>&1)"
}

# ─── 2. BUILD CHECK ──────────────────────────────────────────
if (-not $SkipBuild) {
  Log-Info "Running type check..."
  Push-Location $ROOT
  try {
    $tscOutput = npx tsc --noEmit 2>&1
    if ($LASTEXITCODE -ne 0) {
      Write-Host $tscOutput -ForegroundColor Red
      Log-Error "TypeScript errors found. Fix before deploying."
    }
    Log-Ok "TypeScript: no errors"
  } finally {
    Pop-Location
  }
} else {
  Log-Warn "Skipping build check (--SkipBuild flag set)"
}

# ─── 3. DEPLOY ───────────────────────────────────────────────
Log-Info "Deploying to Vercel..."
Push-Location $ROOT

$deployArgs = @("deploy", "--yes", "--name=$ProjectName")
if ($Prod) {
  $deployArgs += "--prod"
  Log-Info "Target: PRODUCTION"
} else {
  Log-Info "Target: Preview (use -Prod flag for production)"
}

try {
  $deployOutput = & vercel @deployArgs 2>&1
  if ($LASTEXITCODE -ne 0) {
    Write-Host $deployOutput -ForegroundColor Red
    Log-Error "Vercel deploy failed."
  }
} finally {
  Pop-Location
}

# Extract deployed URL
$DEPLOYED_URL = ($deployOutput | Select-String -Pattern "https://[^\s]+" | Select-Object -Last 1).Matches[0].Value
if (-not $DEPLOYED_URL) {
  Log-Error "Could not extract deployed URL from Vercel output."
}

Log-Ok "Deployed to: $DEPLOYED_URL"

# ─── 4. HEALTH CHECK ─────────────────────────────────────────
Log-Info "Running health check on $DEPLOYED_URL/api/health ..."
Start-Sleep -Seconds 5

$maxRetries = 5
$retry = 0
$healthy = $false

while ($retry -lt $maxRetries -and -not $healthy) {
  try {
    $response = Invoke-RestMethod -Uri "$DEPLOYED_URL/api/health" -Method GET -TimeoutSec 10
    if ($response.status -eq "healthy") {
      $healthy = $true
      Log-Ok "Health check passed: $($response | ConvertTo-Json -Compress)"
    }
  } catch {
    $retry++
    if ($retry -lt $maxRetries) {
      Log-Warn "Health check attempt $retry failed, retrying in 5s..."
      Start-Sleep -Seconds 5
    }
  }
}

if (-not $healthy) {
  Log-Error "Health check failed after $maxRetries attempts. Consider rollback."
}

# ─── 5. RECORD DEPLOYMENT ────────────────────────────────────
$timestamp = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
$env_label = if ($Prod) { "production" } else { "preview" }
$entry = "| $timestamp | TASK-031 | $env_label | $DEPLOYED_URL | ✅ healthy |"

$deployLog = "$ROOT\docs\deployments.md"
if (Test-Path $deployLog) {
  Add-Content -Path $deployLog -Value $entry
  Log-Ok "Logged to docs/deployments.md"
}

# ─── DONE ────────────────────────────────────────────────────
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  DEPLOY COMPLETE" -ForegroundColor Green
Write-Host "  URL: $DEPLOYED_URL" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
exit 0
