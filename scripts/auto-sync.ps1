# ============================================================
# AUTO-SYNC: GitHub to Local
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
$stashed = $false

function Sync-FromGitHub {
    $script:stashed = $false
    $repoRoot = git rev-parse --show-toplevel 2>$null
    if (-not $repoRoot) {
        Write-Host "ERROR: Not in a git repository" -ForegroundColor Red
        return $false
    }

    # Check if there are local uncommitted changes
    $dirty = git status --porcelain 2>$null
    if ($dirty) {
        $ts = Get-Date -Format 'HH:mm:ss'
        Write-Host "[$ts] Local changes detected - stashing before pull..." -ForegroundColor Yellow
        $stashName = "auto-sync-stash-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
        git stash push -m $stashName 2>$null
        $script:stashed = $true
    }

    # Fetch remote
    git fetch origin $Branch --quiet 2>$null

    # Check if behind
    $localHash = git rev-parse HEAD 2>$null
    $remoteHash = git rev-parse "origin/$Branch" 2>$null

    if ($localHash -eq $remoteHash) {
        $ts = Get-Date -Format 'HH:mm:ss'
        Write-Host "[$ts] In sync" -ForegroundColor DarkGray
        if ($script:stashed) {
            git stash pop --quiet 2>$null
        }
        return $false
    }

    # Count new commits
    $range = "$localHash..$remoteHash"
    $newCommits = git log --oneline $range 2>$null
    $commitCount = ($newCommits | Measure-Object).Count

    $ts = Get-Date -Format 'HH:mm:ss'
    Write-Host "[$ts] $commitCount new commit(s) found - pulling..." -ForegroundColor Cyan

    # Pull with fast-forward only
    git pull origin $Branch --ff-only 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $ts = Get-Date -Format 'HH:mm:ss'
        Write-Host "[$ts] SYNCED $commitCount commit(s)" -ForegroundColor Green
        if ($newCommits) {
            $newCommits | ForEach-Object { Write-Host "   -> $_" -ForegroundColor DarkCyan }
        }
    }
    else {
        $ts = Get-Date -Format 'HH:mm:ss'
        Write-Host "[$ts] Fast-forward failed - trying rebase..." -ForegroundColor Yellow
        git pull origin $Branch --rebase 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            $ts = Get-Date -Format 'HH:mm:ss'
            Write-Host "[$ts] Rebased successfully" -ForegroundColor Green
        }
        else {
            $ts = Get-Date -Format 'HH:mm:ss'
            Write-Host "[$ts] CONFLICT - manual resolution needed" -ForegroundColor Red
            git rebase --abort 2>$null
        }
    }

    # Restore stash if we stashed
    if ($script:stashed) {
        git stash pop --quiet 2>$null
        if ($LASTEXITCODE -ne 0) {
            $ts = Get-Date -Format 'HH:mm:ss'
            Write-Host "[$ts] Stash conflict - check: git stash list" -ForegroundColor Yellow
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
Write-Host "Press Ctrl+C to stop"
Write-Host ""

while ($true) {
    Sync-FromGitHub
    Start-Sleep -Seconds $Interval
}
