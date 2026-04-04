#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Self-healing .agents/ restore script.
    Run by Antigravity on EVERY session boot -- takes ~1s.
    Also run by GitHub Actions on every push to protect against agent deletions.

.DESCRIPTION
    Copies canonical rules from the global Antigravity installation into this
    project's .agents/ folder. If a tool (Jules, Lovable, another AI) deletes
    or overwrites .agents/, this script restores it instantly.

.USAGE
    .\restore-agents.ps1                  # restore silently
    .\restore-agents.ps1 -Verbose         # show what was copied
    .\restore-agents.ps1 -Check           # just check, don't copy
#>
param([switch]$Check, [switch]$Verbose)

$globalWorkflows = "C:\Users\yuryz\.gemini\antigravity\global_workflows"
$globalSkillsSrc = "C:\Users\yuryz\Documents\GitHub\Portals\Design\.agents\skills"
# Fallback: use starter-kit if Design portal not available
$fallbackSkills  = "C:\Users\yuryz\Documents\GitHub\Samples\platform-integration\starter-kit\.agents\skills"

$projectRoot     = $PSScriptRoot
$agentsDir       = Join-Path $projectRoot ".agents"
$workflowsDir    = Join-Path $agentsDir "workflows"
$skillsDir       = Join-Path $agentsDir "skills"

$errors = 0
$restored = 0

function Log($msg, $color="Gray") {
    if ($Verbose -or $color -eq "Red" -or $color -eq "Yellow") {
        Write-Host $msg -ForegroundColor $color
    }
}

# ── WORKFLOWS ────────────────────────────────────────────────────────────────
if (-not (Test-Path $globalWorkflows)) {
    Write-Host "WARNING: Global workflows not found at $globalWorkflows" -ForegroundColor Yellow
} else {
    New-Item -ItemType Directory -Force $workflowsDir | Out-Null
    $globalFiles = Get-ChildItem $globalWorkflows -Filter "*.md"
    foreach ($f in $globalFiles) {
        $dest = Join-Path $workflowsDir $f.Name
        $needsCopy = -not (Test-Path $dest)
        if (-not $needsCopy) {
            # Also refresh if source is newer
            $needsCopy = $f.LastWriteTime -gt (Get-Item $dest).LastWriteTime
        }
        if ($Check) {
            if (-not (Test-Path $dest)) {
                Write-Host "MISSING: workflows/$($f.Name)" -ForegroundColor Red
                $errors++
            }
        } elseif ($needsCopy) {
            Copy-Item $f.FullName $dest -Force
            Log "  Restored: workflows/$($f.Name)" "Green"
            $restored++
        } else {
            Log "  OK: workflows/$($f.Name)"
        }
    }
}

# ── SKILLS ──────────────────────────────────────────────────────────────────
$skillsSrc = if (Test-Path $globalSkillsSrc) { $globalSkillsSrc } else { $fallbackSkills }

if (-not (Test-Path $skillsSrc)) {
    Write-Host "WARNING: Skills source not found. Skipping skills restore." -ForegroundColor Yellow
} else {
    New-Item -ItemType Directory -Force $skillsDir | Out-Null
    $skillDirs = Get-ChildItem $skillsSrc -Directory
    foreach ($skill in $skillDirs) {
        $destSkill = Join-Path $skillsDir $skill.Name
        $skillMd   = Join-Path $skill.FullName "SKILL.md"
        $destMd    = Join-Path $destSkill "SKILL.md"
        if (-not (Test-Path $skillMd)) { continue }

        New-Item -ItemType Directory -Force $destSkill | Out-Null
        $needsCopy = -not (Test-Path $destMd)
        if (-not $needsCopy) {
            $needsCopy = (Get-Item $skillMd).LastWriteTime -gt (Get-Item $destMd).LastWriteTime
        }
        if ($Check) {
            if (-not (Test-Path $destMd)) {
                Write-Host "MISSING: skills/$($skill.Name)/SKILL.md" -ForegroundColor Red
                $errors++
            }
        } elseif ($needsCopy) {
            Copy-Item $skillMd $destMd -Force
            Log "  Restored: skills/$($skill.Name)/SKILL.md" "Green"
            $restored++
        } else {
            Log "  OK: skills/$($skill.Name)"
        }
    }
}

# ── IDE EXPANSION RULE ───────────────────────────────────────────────────────
$ideRule = Join-Path $agentsDir "IDE_EXPANSION_RULE"
if (-not (Test-Path $ideRule) -and -not $Check) {
    @"
# IDE Expansion Rule
# Antigravity reads .agents/workflows/ and .agents/skills/ on every session.
# Run restore-agents.ps1 to self-heal if any are missing.
"@ | Set-Content $ideRule
    Log "  Restored: IDE_EXPANSION_RULE" "Green"
    $restored++
}

# ── SUMMARY ──────────────────────────────────────────────────────────────────
if ($Check) {
    if ($errors -eq 0) {
        Write-Host "✅ All .agents/ rules present ($((Get-ChildItem $workflowsDir -Filter '*.md').Count) workflows, $((Get-ChildItem $skillsDir -Directory).Count) skills)" -ForegroundColor Green
        exit 0
    } else {
        Write-Host "❌ $errors missing file(s) in .agents/" -ForegroundColor Red
        exit 1
    }
} elseif ($restored -gt 0) {
    Write-Host "✅ Restored $restored file(s) to .agents/" -ForegroundColor Green
} else {
    Write-Host "✅ .agents/ is complete -- nothing to restore" -ForegroundColor Green
}

