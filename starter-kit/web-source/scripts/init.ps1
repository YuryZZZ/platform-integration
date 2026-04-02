#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Portals Template Initializer
  Bootstraps a new web project from the Portals/Design master template.

.PARAMETER ProjectName
  The display name of your new project (e.g. "Acme Portal")

.PARAMETER PrimaryColor
  Hex color for the primary brand accent (default: #6366f1)

.PARAMETER Domain
  The production domain (e.g. "acme.com") — used in metadata

.EXAMPLE
  .\scripts\init.ps1 -ProjectName "Acme Portal" -PrimaryColor "#0ea5e9" -Domain "acme.com"
#>

param(
  [Parameter(Mandatory=$true)]
  [string]$ProjectName,

  [string]$PrimaryColor = "#6366f1",

  [string]$Domain = "example.com"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "⚡ Portals Template Initializer" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Project : $ProjectName"
Write-Host "  Color   : $PrimaryColor"
Write-Host "  Domain  : $Domain"
Write-Host ""

# ── 1. Slug the project name for package.json
$slug = $ProjectName.ToLower() -replace '[^a-z0-9]+', '-' -replace '(^-|-$)', ''

# ── 2. Update package.json
Write-Host "→ Updating package.json..." -ForegroundColor Yellow
$pkg = Get-Content "package.json" -Raw | ConvertFrom-Json
$pkg.name = $slug
$pkg.description = "$ProjectName — built on Portals template"
$pkg | ConvertTo-Json -Depth 10 | Set-Content "package.json" -Encoding UTF8
Write-Host "  ✓ package.json updated (name: $slug)"

# ── 3. Update next.config.ts metadata comment
Write-Host "→ Patching next.config.ts..." -ForegroundColor Yellow
$nextCfg = Get-Content "next.config.ts" -Raw
$nextCfg = $nextCfg -replace 'nexus-design-template|nexus-ai-platform', $slug
Set-Content "next.config.ts" $nextCfg -Encoding UTF8
Write-Host "  ✓ next.config.ts patched"

# ── 4. Update primary color in globals.css
Write-Host "→ Setting brand color in globals.css..." -ForegroundColor Yellow
$css = Get-Content "src/app/globals.css" -Raw
# Replace the indigo primary color token line
$css = $css -replace '--color-primary:\s*#[0-9a-fA-F]{3,6}', "--color-primary: $PrimaryColor"
Set-Content "src/app/globals.css" $css -Encoding UTF8
Write-Host "  ✓ globals.css → --color-primary: $PrimaryColor"

# ── 5. Copy .env.example → .env.local (if not already exists)
if (-not (Test-Path ".env.local")) {
  Write-Host "→ Creating .env.local from .env.example..." -ForegroundColor Yellow
  Copy-Item ".env.example" ".env.local"
  # Patch the server URL
  $env = Get-Content ".env.local" -Raw
  $env = $env -replace 'OTEL_SERVICE_NAME=nexus-ai', "OTEL_SERVICE_NAME=$slug"
  Set-Content ".env.local" $env -Encoding UTF8
  Write-Host "  ✓ .env.local created — fill in your API keys!"
} else {
  Write-Host "  ℹ .env.local already exists, skipping." -ForegroundColor Gray
}

# ── 6. Seed the first template-feedback log
Write-Host "→ Seeding template-feedback log..." -ForegroundColor Yellow
$feedbackDir = ".template-feedback"
if (-not (Test-Path $feedbackDir)) { New-Item -ItemType Directory $feedbackDir | Out-Null }
$ts = (Get-Date -Format "yyyy-MM-ddTHH-mm-ssZ")
$feedbackFile = "$feedbackDir/$ts-project-initialized.md"
@"
# Template Improvement: Project Initialized

**Date:** $(Get-Date -Format "o")
**Project:** $ProjectName
**Color:** $PrimaryColor
**Domain:** $Domain

## Intent
This is the seed log entry created when the project was first initialized from the Portals template.
Use `npm run log:feedback "description"` to record future improvements.
"@ | Set-Content $feedbackFile -Encoding UTF8
Write-Host "  ✓ Feedback log seeded: $feedbackFile"

# ── 7. Done
Write-Host ""
Write-Host "✅ Initialization complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. npm install"
Write-Host "  2. npm run dev           → http://localhost:3001"
Write-Host "  3. npm run build         → verify Exit code 0"
Write-Host "  4. Open TEMPLATE_INIT.md → follow the customization checklist"
Write-Host ""
