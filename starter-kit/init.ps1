param(
    [string]$ProjectId = "",
    [string]$ProjectName = "",
    [string]$GitHubOwner = "",
    [string]$GitHubRepo = "",
    [string]$LocalUser = $env:USERNAME,
    [string]$Region = "us-central1",
    [switch]$CreateProject,
    [switch]$EnableApis,
    [switch]$InstallDependencies
)

$ErrorActionPreference = "Stop"

function Write-Step($Number, $Message) {
    Write-Host "`n[$Number/8] $Message" -ForegroundColor Green
}

function Test-Command($Name) {
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Update-TemplateFiles {
    param(
        [string]$ResolvedProjectId,
        [string]$ResolvedProjectName,
        [string]$ResolvedGitHubOwner,
        [string]$ResolvedGitHubRepo,
        [string]$ResolvedLocalUser,
        [string]$ResolvedRegion
    )

    $extensions = @(
        ".json", ".md", ".ps1", ".ts", ".js", ".yml", ".yaml", ".py", ".txt",
        ".html", ".css", ".tsx", ".jsx", ".mjs", ".cjs", ".env", ".rc"
    )

    $files = Get-ChildItem -Recurse -File -Exclude "init.ps1", "*.exe", "*.zip" |
        Where-Object { $extensions -contains $_.Extension -or $_.Name -eq ".firebaserc" }

    foreach ($file in $files) {
        $content = Get-Content -LiteralPath $file.FullName -Raw -ErrorAction SilentlyContinue
        if (-not $content) {
            continue
        }

        $updated = $content
        $updated = $updated -replace "YOUR_GCP_PROJECT_ID", [regex]::Escape($ResolvedProjectId).Replace('\\', '\')
        $updated = $updated -replace "YOUR_PROJECT_ID", [regex]::Escape($ResolvedProjectId).Replace('\\', '\')
        $updated = $updated -replace "YOUR_PROJECT_NAME", [regex]::Escape($ResolvedProjectName).Replace('\\', '\')
        $updated = $updated -replace "YOUR_GITHUB_OWNER", [regex]::Escape($ResolvedGitHubOwner).Replace('\\', '\')
        $updated = $updated -replace "YOUR_GITHUB_USER", [regex]::Escape($ResolvedGitHubOwner).Replace('\\', '\')
        $updated = $updated -replace "YOUR_REPO", [regex]::Escape($ResolvedGitHubRepo).Replace('\\', '\')
        $updated = $updated -replace "YOUR_LOCAL_USER", [regex]::Escape($ResolvedLocalUser).Replace('\\', '\')
        $updated = $updated -replace "YOUR_REGION", [regex]::Escape($ResolvedRegion).Replace('\\', '\')
        $updated = $updated -replace "YOUR_USER", [regex]::Escape($ResolvedGitHubOwner).Replace('\\', '\')

        if ($updated -ne $content) {
            Set-Content -LiteralPath $file.FullName -Value $updated
            Write-Host "  Updated: $($file.FullName.Replace((Get-Location).Path + '\\', ''))"
        }
    }
}

Write-Host "`n=== PORTABLE PROJECT INITIALIZER ===" -ForegroundColor Cyan
Write-Host "This script personalizes the starter kit for one project while keeping machine-local values separate.`n"

if (-not $ProjectId) { $ProjectId = Read-Host "GCP/Firebase Project ID (e.g. my-app-prod)" }
if (-not $ProjectName) { $ProjectName = Read-Host "Display Name (e.g. My App)" }
if (-not $GitHubOwner) { $GitHubOwner = Read-Host "GitHub owner/user or org (e.g. YuryZZZ)" }
if (-not $GitHubRepo) { $GitHubRepo = Read-Host "GitHub repo name (e.g. my-app)" }
if (-not $LocalUser) {
    $LocalUser = Read-Host "Local Windows username for MCP paths"
}

Write-Host "Config:" -ForegroundColor Yellow
Write-Host "  Project ID:     $ProjectId"
Write-Host "  Display Name:   $ProjectName"
Write-Host "  GitHub Repo:    $GitHubOwner/$GitHubRepo"
Write-Host "  Local User:     $LocalUser"
Write-Host "  Region:         $Region"
Write-Host "  Create Project: $CreateProject"
Write-Host "  Enable APIs:    $EnableApis"
Write-Host "  Install Deps:   $InstallDependencies`n"

$confirm = Read-Host "Proceed? (y/n)"
if ($confirm -notin @("y", "Y")) {
    Write-Host "Aborted."
    exit 0
}

Write-Step 1 "Replacing placeholders in template files"
Update-TemplateFiles -ResolvedProjectId $ProjectId -ResolvedProjectName $ProjectName -ResolvedGitHubOwner $GitHubOwner -ResolvedGitHubRepo $GitHubRepo -ResolvedLocalUser $LocalUser -ResolvedRegion $Region

Write-Step 2 "Checking machine prerequisites"
$checks = @(
    @{ Name = "git"; Required = $true },
    @{ Name = "gcloud"; Required = $false },
    @{ Name = "firebase"; Required = $false },
    @{ Name = "npm"; Required = $false }
)
foreach ($check in $checks) {
    if (Test-Command $check.Name) {
        Write-Host "  $($check.Name): available"
    } elseif ($check.Required) {
        throw "Required command '$($check.Name)' was not found in PATH."
    } else {
        Write-Host "  $($check.Name): not installed or not in PATH" -ForegroundColor Yellow
    }
}

Write-Step 3 "Checking authentication state"
if (Test-Command "gcloud") {
    $gcloudAuth = gcloud auth list --format="value(account)" 2>$null | Select-Object -First 1
    if ($gcloudAuth) {
        Write-Host "  GCP account: $gcloudAuth"
    } else {
        Write-Host "  GCP account: missing. Run 'gcloud auth login' and 'gcloud auth application-default login'." -ForegroundColor Yellow
    }
} else {
    Write-Host "  Skipped gcloud auth check." -ForegroundColor Yellow
}

if (Test-Command "firebase") {
    $firebaseProjects = firebase projects:list --json 2>$null
    if ($firebaseProjects) {
        Write-Host "  Firebase CLI: authenticated"
    } else {
        Write-Host "  Firebase CLI: login required. Run 'firebase login'." -ForegroundColor Yellow
    }
} else {
    Write-Host "  Skipped Firebase auth check." -ForegroundColor Yellow
}

Write-Step 4 "Configuring the local gcloud project context"
if (Test-Command "gcloud") {
    $existingProject = gcloud projects describe $ProjectId 2>$null
    if ($existingProject) {
        Write-Host "  Project $ProjectId already exists."
    } elseif ($CreateProject) {
        gcloud projects create $ProjectId --name="$ProjectName"
        Write-Host "  Created project: $ProjectId"
    } else {
        Write-Host "  Project $ProjectId was not found. Re-run with -CreateProject if you want this script to create it." -ForegroundColor Yellow
    }

    gcloud config set project $ProjectId | Out-Null
    gcloud config set compute/region $Region | Out-Null
    Write-Host "  gcloud context set to $ProjectId / $Region"
} else {
    Write-Host "  Skipped gcloud configuration." -ForegroundColor Yellow
}

Write-Step 5 "Enabling platform APIs when requested"
if ($EnableApis -and (Test-Command "gcloud")) {
    gcloud services enable `
        run.googleapis.com `
        cloudbuild.googleapis.com `
        artifactregistry.googleapis.com `
        firestore.googleapis.com `
        firebase.googleapis.com `
        bigquery.googleapis.com `
        --project=$ProjectId
    Write-Host "  Core APIs enabled."
} elseif ($EnableApis) {
    Write-Host "  Cannot enable APIs because gcloud is unavailable." -ForegroundColor Yellow
} else {
    Write-Host "  Skipped API enablement. Re-run with -EnableApis to automate this step."
}

Write-Step 6 "Configuring Firebase and Git"
if (Test-Command "firebase") {
    Write-Host "  Firebase files already point at $ProjectId."
    Write-Host "  If this is a brand-new Firebase project, run: firebase projects:addfirebase $ProjectId"
    Write-Host "  Then create a web app and paste its SDK values into web/.env.local."
} else {
    Write-Host "  Firebase CLI not available. Skipping Firebase helper output." -ForegroundColor Yellow
}

if (-not (Test-Path ".git")) {
    git init | Out-Null
    git branch -M master | Out-Null
    Write-Host "  Git repository initialized."
} else {
    Write-Host "  Existing Git repository detected."
}

$remoteUrl = "https://github.com/$GitHubOwner/$GitHubRepo.git"
$originExists = git remote 2>$null | Select-String -Pattern "^origin$"
if ($originExists) {
    git remote set-url origin $remoteUrl
    Write-Host "  Updated origin to $remoteUrl"
} else {
    git remote add origin $remoteUrl
    Write-Host "  Added origin $remoteUrl"
}

Write-Step 7 "Installing dependencies when requested"
if ($InstallDependencies) {
    if (Test-Path "web/package.json") {
        Push-Location web
        npm install
        Pop-Location
        Write-Host "  Installed web dependencies."
    } elseif (Test-Path "web") {
        Write-Host "  web/package.json is not present yet. Materialize the web app before installing dependencies." -ForegroundColor Yellow
    }

    if (Test-Path "ui/package.json") {
        Push-Location ui
        npm install
        Pop-Location
        Write-Host "  Installed UI validator dependencies."
    }
} else {
    Write-Host "  Skipped dependency installation. Re-run with -InstallDependencies to automate it."
}

Write-Step 8 "Printing next actions"
Write-Host "`nPortable framework bootstrap complete." -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Fill .env.local and web/.env.local with project-local values."
Write-Host "  2. Copy reference/configs/mcp_config.json.reference into your local Antigravity or Gemini MCP config and replace YOUR_LOCAL_USER plus any API keys."
Write-Host "  3. If the Firebase project is new, run: firebase projects:addfirebase $ProjectId"
Write-Host "  4. Create a Firebase web app, then paste the SDK values into web/.env.local."
Write-Host "  5. Build and deploy from web/ when the frontend is ready."
Write-Host ""
Write-Host "Reference docs:"
Write-Host "  - README.md"
Write-Host "  - reference/INDEX.md"
Write-Host "  - reference/FRAMEWORK_TEMPLATE.md"
Write-Host ""
Write-Host "Deploy target: https://$ProjectId.web.app"
