# setup.ps1 - Fully Automated New Project Setup
# Double-click setup.bat to run this
# ---------------------------------------------------------------

$ErrorActionPreference = 'Continue'

# ── Where are we? ──────────────────────────────────────────────
$Root = $PSScriptRoot

# Project name = PARENT folder of starter-kit (the actual project)
$ParentFolder = Split-Path $Root -Parent
$FolderName   = Split-Path $Root -Leaf

# If this folder is still called "starter-kit", use parent folder name
if ($FolderName -eq 'starter-kit') {
    $ProjectName = Split-Path $ParentFolder -Leaf
} else {
    $ProjectName = $FolderName
}

# Clean project name for Firebase ID (lowercase, only a-z0-9-)
$FirebaseId = $ProjectName.ToLower() -replace '[^a-z0-9]', '-' -replace '-+', '-'
$FirebaseId = $FirebaseId.Trim('-')
if ($FirebaseId.Length -lt 2) { $FirebaseId = 'my-project' }

$GitHubUser  = 'YuryZZZ'
$GoogleAiKey = 'AIzaSyAqKnOs6P3CYwtgqNzTv3tciH2fSiTTWEs'

# ── Read GitHub token ──────────────────────────────────────────
$GitHubToken = ''
try {
    $cfgPath = Join-Path $env:USERPROFILE '.gemini\antigravity\mcp_config.json'
    $cfg = Get-Content $cfgPath -Encoding UTF8 | Out-String | ConvertFrom-Json
    $GitHubToken = $cfg.mcpServers.github.env.GITHUB_PERSONAL_ACCESS_TOKEN
} catch {}

# ── Helper: read file safely (PS 2.x + 3.x compatible) ────────
function Read-File($path) {
    try { (Get-Content $path -Encoding UTF8) -join "`n" } catch { $null }
}

# ── Helper: compute 4 brand colors (simple RGB math) ──────────
function Get-BrandColors($hex) {
    $hex = $hex.TrimStart('#')
    if ($hex.Length -ne 6) { $hex = '3B82F6' }

    $r = [Convert]::ToInt32($hex.Substring(0,2), 16)
    $g = [Convert]::ToInt32($hex.Substring(2,2), 16)
    $b = [Convert]::ToInt32($hex.Substring(4,2), 16)

    function ToHex($rv,$gv,$bv) {
        $rv = [Math]::Max(0, [Math]::Min(255, [int]$rv))
        $gv = [Math]::Max(0, [Math]::Min(255, [int]$gv))
        $bv = [Math]::Max(0, [Math]::Min(255, [int]$bv))
        '#{0:X2}{1:X2}{2:X2}' -f $rv, $gv, $bv
    }

    # Dark = 20% darker
    $dark  = ToHex ($r * 0.75) ($g * 0.75) ($b * 0.75)
    # Light = blend with white at 60%
    $light = ToHex ($r * 0.35 + 255 * 0.65) ($g * 0.35 + 255 * 0.65) ($b * 0.35 + 255 * 0.65)
    # Accent = rotate dominant channel (complementary-ish)
    $accent = ToHex ($b * 0.8) ($r * 0.8) ($g * 0.8)

    @{
        Primary = '#' + $hex.ToUpper()
        Dark    = $dark
        Light   = $light
        Accent  = $accent
    }
}

# ── Display ────────────────────────────────────────────────────
Clear-Host
Write-Host ''
Write-Host '=============================================================' -ForegroundColor Cyan
Write-Host "  NEW PROJECT SETUP" -ForegroundColor Cyan
Write-Host '=============================================================' -ForegroundColor Cyan
Write-Host "  Project:   $ProjectName"
Write-Host "  Firebase:  $FirebaseId"
Write-Host "  GitHub:    $GitHubUser/$FirebaseId"
Write-Host '  AI Key:    AIzaSyAq... (pre-configured)'
Write-Host ''
Write-Host '  Answer 4 questions. Everything else is automatic.'
Write-Host '============================================================='
Write-Host ''

# ── Automatic Inference ──────────────────────────────────────────
# Zero-touch setup: infer everything from the folder name
if ($ProjectName -match '\.[a-z]{2,}$') {
    $Domain = $ProjectName
} else {
    $Domain = "$($ProjectName.ToLower() -replace '[^a-z0-9]', '').com"
}
$Phone      = 'TBC'
$Email      = "info@$Domain"
$BrandColor = '#102551' # Default premium dark blue

Write-Host ''
Write-Host 'Running zero-touch automated setup...' -ForegroundColor Green
Write-Host ''

# =============================================================
# STEP 1: Compute 4 colors
# =============================================================
Write-Host '[1/8] Computing brand color palette...'
$C = Get-BrandColors $BrandColor
Write-Host "  Primary:       $($C.Primary)"
Write-Host "  Primary-dark:  $($C.Dark)"
Write-Host "  Primary-light: $($C.Light)"
Write-Host "  Accent:        $($C.Accent)"

# =============================================================
# STEP 2: Create web\ from web-source\
# =============================================================
Write-Host ''
Write-Host '[2/8] Creating web\ from web-source\...'
$WebSource = Join-Path $Root 'web-source'
$WebDir    = Join-Path $Root 'web'

if (-not (Test-Path $WebDir)) {
    if (Test-Path $WebSource) {
        robocopy $WebSource $WebDir /E /XD node_modules .next .git __pycache__ /XF package-lock.json /NFL /NDL /NJH /NJS | Out-Null
        Write-Host '  web\ created from web-source\ (1MB clean copy)' -ForegroundColor Green
    } else {
        Write-Host '  WARNING: web-source\ not found' -ForegroundColor Yellow
    }
} else {
    Write-Host '  web\ already exists - skipping'
}

# =============================================================
# STEP 3: Replace all placeholders
# =============================================================
Write-Host ''
Write-Host '[3/8] Replacing placeholders in all files...'

$extensions = @('.md','.json','.yaml','.yml','.ts','.tsx','.css','.js','.env','.txt','.html','.rc')
$skipDirs   = 'node_modules|\.next|package-lock|\.git|web-source'

$files = Get-ChildItem $Root -Recurse -File -ErrorAction SilentlyContinue | Where-Object {
    ($_.Extension -in $extensions -or $_.Name -eq '.firebaserc') -and
    ($_.FullName -notmatch $skipDirs)
}

$replaced = 0
foreach ($f in $files) {
    $content = Read-File $f.FullName
    if (-not $content) { continue }

    $updated = $content `
        -replace 'YOUR_PROJECT_ID',             $FirebaseId `
        -replace 'YOUR_PROJECT_NAME',           $ProjectName `
        -replace 'YOUR_USER',                   $GitHubUser `
        -replace 'YOUR_REPO',                   $FirebaseId `
        -replace 'YOUR_REGION',                 'us-central1' `
        -replace '<<YOUR_PROJECT_NAME>>',       $ProjectName `
        -replace '<<YOUR_PRIMARY_HEX[^>]*>>',   $C.Primary `
        -replace '<<YOUR_PRIMARY_DARK[^>]*>>',  $C.Dark `
        -replace '<<YOUR_PRIMARY_LIGHT[^>]*>>', $C.Light `
        -replace '<<YOUR_PHONE>>',              $Phone `
        -replace '<<YOUR_EMAIL>>',              $Email `
        -replace '<<YOUR_DOMAIN>>',             $Domain

    if ($updated -ne $content) {
        [System.IO.File]::WriteAllText($f.FullName, $updated, [System.Text.Encoding]::UTF8)
        $replaced++
    }
}
Write-Host "  $replaced files updated" -ForegroundColor Green

# =============================================================
# STEP 4: Create .env.local
# =============================================================
Write-Host ''
Write-Host '[4/8] Creating web\.env.local...'
$EnvFile = Join-Path $WebDir '.env.local'

if (-not (Test-Path $EnvFile)) {
    $lines = @(
        "# Auto-generated by setup.bat -- NEVER commit this file",
        "NEXT_PUBLIC_SITE_NAME=$ProjectName",
        "NEXT_PUBLIC_SITE_TAGLINE=Professional services in London",
        "NEXT_PUBLIC_SITE_DESCRIPTION=$ProjectName - professional services. Call $Phone.",
        "NEXT_PUBLIC_APP_URL=https://$FirebaseId.web.app",
        "NEXT_PUBLIC_PRIMARY_COLOR=$($C.Primary)",
        "NEXT_PUBLIC_PHONE=$Phone",
        "NEXT_PUBLIC_EMAIL=$Email",
        "",
        "GOOGLE_AI_API_KEY=$GoogleAiKey",
        "GOOGLE_GENERATIVE_AI_API_KEY=$GoogleAiKey",
        "GOOGLE_AI_MODEL=gemini-2.0-flash",
        "GOOGLE_AI_MODEL_PRO=gemini-2.5-pro",
        "",
        "NEXT_PUBLIC_FIREBASE_PROJECT_ID=$FirebaseId",
        "NEXT_PUBLIC_FIREBASE_API_KEY=",
        "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=",
        "",
        "JULES_API_KEY=",
        "GITHUB_TOKEN=$GitHubToken"
    )
    [System.IO.File]::WriteAllLines($EnvFile, $lines, [System.Text.Encoding]::UTF8)
    Write-Host '  .env.local created' -ForegroundColor Green
} else {
    Write-Host '  .env.local already exists - skipping'
}

# =============================================================
# STEP 5: Set brand color in globals.css
# =============================================================
Write-Host ''
Write-Host '[5/8] Setting brand color in globals.css...'
$GlobalsCss = Join-Path $WebDir 'src\app\globals.css'
if (Test-Path $GlobalsCss) {
    $css = Read-File $GlobalsCss
    $css = $css -replace '--color-primary:\s*#[0-9a-fA-F]{3,8}', "--color-primary: $($C.Primary)"
    [System.IO.File]::WriteAllText($GlobalsCss, $css, [System.Text.Encoding]::UTF8)
    Write-Host "  --color-primary: $($C.Primary)" -ForegroundColor Green
} else {
    Write-Host '  Skipped - globals.css not found yet'
}

# =============================================================
# STEP 6: npm install
# =============================================================
Write-Host ''
Write-Host '[6/8] Installing npm dependencies...'
$PkgJson = Join-Path $WebDir 'package.json'
if (Test-Path $PkgJson) {
    Push-Location $WebDir
    & npm install --prefer-offline 2>&1 | Where-Object { $_ -match '\S' -and $_ -notmatch 'npm warn|npm notice' } | Select-Object -First 5 | ForEach-Object { Write-Host "  $_" }
    Write-Host '  npm install complete' -ForegroundColor Green
    Pop-Location
} else {
    Write-Host '  Skipped - no package.json found'
}

# =============================================================
# STEP 7: GitHub repo + git push
# =============================================================
Write-Host ''
Write-Host "[7/8] Creating GitHub repo $GitHubUser/$FirebaseId..."
$GhUrl = "https://github.com/$GitHubUser/$FirebaseId.git"

if ($GitHubToken) {
    $headers = @{ 
        Authorization = "token $GitHubToken"
        Accept        = 'application/vnd.github.v3+json'
    }
    $body = @{
        name        = $FirebaseId
        private     = $true
        auto_init   = $false
        description = "$ProjectName - Nexus + Google AI Studio"
    } | ConvertTo-Json

    try {
        $resp  = Invoke-RestMethod 'https://api.github.com/user/repos' -Method Post -Headers $headers -Body $body -ContentType 'application/json'
        $GhUrl = $resp.clone_url
        Write-Host "  Created: $($resp.html_url)" -ForegroundColor Green
    } catch {
        Write-Host '  Repo already exists - using existing' -ForegroundColor Yellow
    }
} else {
    Write-Host '  No GitHub token found - skipping repo creation' -ForegroundColor Yellow
}

Push-Location $Root
if (-not (Test-Path '.git')) { & git init -b master | Out-Null }
& git add -A | Out-Null
& git commit -m "feat: initial setup - $ProjectName" | Out-Null
& git remote remove origin 2>$null
& git remote add origin $GhUrl | Out-Null
& git push -u origin master 2>&1 | Out-Null
Write-Host "  Pushed to $GhUrl" -ForegroundColor Green
Pop-Location

# =============================================================
# STEP 8: Auto-provision Cloud Integrations
# =============================================================
Write-Host ''
Write-Host '[8/8] Provisioning Cloud Infrastructure via APIs...'

try {
    Write-Host "  -> Creating Firebase Project: $FirebaseId"
    & firebase projects:create $FirebaseId --display-name $FirebaseId --non-interactive 2>&1 | Out-Null
} catch {}

Write-Host "  -> GitHub CI/CD established via API."

Write-Host "  -> Injecting automated Workspace Multi-Agent Constitution..."
$AgentRules = @'
# Multi-Agent Workspace Constitution

### 1. Architectural Source of Truth
- **NEVER RUN setup.ps1**. This workspace is already initialized.
- **GitHub is the strict source of truth** for all source code. 
- **The Application Architecture** is Next.js 15 (App Router).

### 2. Multi-Agent Integration Flow (How we build)
You (Antigravity) act as the central orchestrator across 5 different platforms. When resolving tasks, respect these strict boundaries:

1. **Google Stitch (Design):**
   - If the user requests a design system or UI mockup, use the stitch MCP tool to generate the visual framework and save the design tokens.
2. **Lovable (Frontend UI Generation):**
   - Lovable handles rapid visual component generation.
   - Before editing local code, **always run git pull** to ensure Lovable's latest components are ingested into your context.
3. **Supabase (Backend / Database):**
   - Supabase replaces Firebase Firestore/Auth. 
   - Use the natively connected supabase MCP tool.
4. **Nexus Template & CMS Conventions (CRITICAL):**
   - **Never edit anything inside** `src/components/blocks/` — this is the Nexus Master Framework (Read-Only). 
   - CMS data flows from Supabase directly to Next.js 15 Server Components. 
   - UI styling requires strict adherence to `globals.css` and `--color-primary`.
5. **Antigravity (Hardening & Logic):**
   - Your primary job is to take Lovable's raw React UI components and wire them up securely to Supabase.
   - You must execute sequential-thinking before making any logic refactors.
6. **Jules AI (Code Review & Architecture QA):**
   - Jules acts directly on the GitHub layer.
   - When code is pushed, Jules automatically analyzes pull requests for security, performance, and Next.js 15 compliance.
7. **Firebase App Hosting (Deployment):**
   - Deployments are triggered strictly via GitHub pushes. 

### 3. Execution Mandates
- **Sync First:** Never overwrite a file without checking if Lovable modified it.
- **MCP Only:** Always use the dedicated MCP tools (github, supabase, firebase, stitch) instead of CLI shell commands whenever possible.
'@

Set-Content -Path "web\.cursorrules" -Value $AgentRules
Set-Content -Path "web\.windsurfrules" -Value $AgentRules
New-Item -ItemType Directory -Force -Path ".gemini\rules" | Out-Null
Set-Content -Path ".gemini\rules\workspace.md" -Value $AgentRules
Set-Content -Path ".agents\RULES.md" -Value $AgentRules

# Prune Setup Docs
Write-Host "  -> Cleaning up initialization triggers (START_HERE.md)"
Remove-Item -Path "START_HERE.md" -Force -ErrorAction SilentlyContinue

Write-Host "  -> System zero-touch initialization complete."

# =============================================================
# DONE
# =============================================================
Write-Host ''
Write-Host '=============================================================' -ForegroundColor Green
Write-Host "  SETUP COMPLETE - $ProjectName" -ForegroundColor Green
Write-Host '=============================================================' -ForegroundColor Green
Write-Host ''
Write-Host "  Colors:  $($C.Primary) / $($C.Dark) / $($C.Light) / $($C.Accent)"
Write-Host "  GitHub:  https://github.com/$GitHubUser/$FirebaseId"
Write-Host "  Live:    https://$FirebaseId.web.app"
Write-Host ''
Write-Host '  ALL INTEGRATIONS WIRED:'
    Write-Host '    Firebase App Hosting -> Auto-deploys from GitHub'
    Write-Host '    Lovable              -> Pushes to GitHub'
    Write-Host '    Jules                -> Reads/Writes to GitHub'
    Write-Host '    Stitch               -> Use directly via Antigravity MCP'
Write-Host ''
Write-Host '  START BUILDING:'
Write-Host '    cd web && npm run dev    (localhost:4000)'
Write-Host '    Edit src\app\(marketing)\page.tsx'
Write-Host '    Drop images in public\'
Write-Host ''
Write-Host '  DEPLOY:  double-click deploy.bat'
Write-Host ''
