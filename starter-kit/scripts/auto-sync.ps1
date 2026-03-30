# ============================================================
# AUTO-SYNC: GitHub → Local
# ============================================================
# Watches for remote changes and auto-pulls to keep local
# repo in sync with GitHub. Run this in the background.
#
# Usage:
#   .\auto-sync.ps1                    # Default: check every 30s
#   .\auto-sync.ps1 -Interval 10       # Check every 10s
#   .\auto-sync.ps1 -Branch master     # Watch specific branch
#   .\auto-sync.ps1 -Once              # Single check (for scheduler)
# ============================================================

param(
    [int]$Interval = 30,
    [string]$Branch = "master",
    [switch]$Once
)

$ErrorActionPreference = "SilentlyContinue"

function Sync-FromGitHub {
    $repoRoot = git rev-parse --show-toplevel 2>$null
    if (-not $repoRoot) {
        Write-Host "ERROR: Not in a git repository" -ForegroundColor Red
        return $false
    }

    # Check if there are local uncommitted changes
    $dirty = git status --porcelain 2>$null
    if ($dirty) {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Local changes detected — stashing before pull..." -ForegroundColor Yellow
        git stash push -m "auto-sync-stash-$(Get-Date -Format 'yyyyMMdd-HHmmss')" 2>$null
        $stashed = $true
    }

    # Fetch remote
    git fetch origin $Branch --quiet 2>$null

    # Check if behind
    $localHash = git rev-parse HEAD 2>$null
    $remoteHash = git rev-parse "origin/$Branch" 2>$null

    if ($localHash -eq $remoteHash) {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] In sync ✓" -ForegroundColor DarkGray
        if ($stashed) {
            git stash pop --quiet 2>$null
        }
        return $false
    }

    # Count new commits
    $newCommits = git log --oneline "$localHash..$remoteHash" 2>$null
    $commitCount = ($newCommits | Measure-Object).Count

    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] $commitCount new commit(s) found — pulling..." -ForegroundColor Cyan

    # Pull
    $pullResult = git pull origin $Branch --ff-only 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✅ Synced $commitCount commit(s)" -ForegroundColor Green
        $newCommits | ForEach-Object { Write-Host "   └── $_" -ForegroundColor DarkCyan }
    }
    else {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ⚠️ Fast-forward failed — trying rebase..." -ForegroundColor Yellow
        git pull origin $Branch --rebase 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✅ Rebased successfully" -ForegroundColor Green
        }
        else {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ❌ Sync conflict — manual resolution needed" -ForegroundColor Red
            git rebase --abort 2>$null
        }
    }

    # Restore stash if we stashed
    if ($stashed) {
        git stash pop --quiet 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ⚠️ Stash conflict — check: git stash list" -ForegroundColor Yellow
        }
    }

    return $true
}

# --- Main ---
if ($Once) {
    Sync-FromGitHub
    exit 0
}

Write-Host "=== AUTO-SYNC STARTED ===" -ForegroundColor Cyan
Write-Host "Branch:   $Branch"
Write-Host "Interval: ${Interval}s"
Write-Host "Press Ctrl+C to stop`n"

while ($true) {
    Sync-FromGitHub
    Start-Sleep -Seconds $Interval
}
