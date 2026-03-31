@echo off
setlocal EnableDelayedExpansion
cls

echo ========================================================
echo   Nexus AI — Project Bootstrapper v2.0
echo   Copies Design Template + Platform Integration docs
echo ========================================================
echo.

:: ────────────────────────────────────────────────────────────
:: CONFIGURATION — Adjust these paths if your repos move
:: ────────────────────────────────────────────────────────────
set "DESIGN_SRC=%~dp0..\..\Portals\Design"
set "PI_SRC=%~dp0"

:: Resolve to absolute paths
pushd "%DESIGN_SRC%" 2>nul
if errorlevel 1 (
    echo [ERROR] Design template not found at: %DESIGN_SRC%
    echo         Expected: C:\Users\yuryz\Documents\GitHub\Portals\Design
    echo         Please update DESIGN_SRC in this script.
    pause
    exit /b 1
)
set "DESIGN_ABS=%CD%"
popd

pushd "%PI_SRC%" 2>nul
set "PI_ABS=%CD%"
popd

echo [INFO] Design template : %DESIGN_ABS%
echo [INFO] Platform docs   : %PI_ABS%
echo.

:: ────────────────────────────────────────────────────────────
:: ASK FOR PROJECT NAME AND DESTINATION
:: ────────────────────────────────────────────────────────────
set /p ProjectName="Enter your new project name (e.g., my-new-app): "

if "%ProjectName%"=="" (
    echo [ERROR] Project name cannot be empty.
    pause
    exit /b 1
)

set /p TargetDir="Target directory [default: C:\Users\yuryz\Documents\GitHub\Portals]: "
if "%TargetDir%"=="" set "TargetDir=C:\Users\yuryz\Documents\GitHub\Portals"

set "ProjectPath=%TargetDir%\%ProjectName%"

if exist "%ProjectPath%" (
    echo [ERROR] Folder "%ProjectPath%" already exists! Choose another name.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo   Creating: %ProjectPath%
echo ========================================================
echo.

:: ────────────────────────────────────────────────────────────
:: STEP 1: Copy the Design template (the actual project)
:: ────────────────────────────────────────────────────────────
echo [1/6] Copying Design template...
xcopy "%DESIGN_ABS%\*" "%ProjectPath%\" /E /H /C /I /Q /EXCLUDE:%~dp0xcopy_exclude.txt
echo     [OK] Design template copied.

:: ────────────────────────────────────────────────────────────
:: STEP 2: Copy platform-integration reference docs
:: ────────────────────────────────────────────────────────────
echo [2/6] Copying platform-integration reference docs...
mkdir "%ProjectPath%\reference" 2>nul
for %%f in (
    README.md
    PROMPT_TO_PORTAL.md
    QUICK_START.md
    AUTH_FLOW.md
    JULES_INTEGRATION.md
    STITCH_DESIGN.md
    VERCEL_DEPLOYMENT.md
    NEW_PROJECT_GUIDE.md
    UI_PROJECT_REFERENCE.md
    INDEX.md
) do (
    if exist "%PI_ABS%\%%f" copy /Y "%PI_ABS%\%%f" "%ProjectPath%\reference\%%f" >nul
)
:: Copy configs and workflows
xcopy "%PI_ABS%\configs\*" "%ProjectPath%\reference\configs\" /E /H /C /I /Q 2>nul
xcopy "%PI_ABS%\workflows\*" "%ProjectPath%\reference\workflows\" /E /H /C /I /Q 2>nul
xcopy "%PI_ABS%\scripts\*" "%ProjectPath%\reference\scripts\" /E /H /C /I /Q 2>nul
echo     [OK] Reference docs in: reference\

:: ────────────────────────────────────────────────────────────
:: STEP 3: Run init.ps1 if it exists
:: ────────────────────────────────────────────────────────────
echo [3/6] Initializing secure environment...
cd /d "%ProjectPath%"
if exist "init.ps1" (
    powershell.exe -ExecutionPolicy Bypass -File "init.ps1"
) else (
    echo     [SKIP] No init.ps1 found — creating .env.local from .env.example
    if exist ".env.example" copy ".env.example" ".env.local" >nul
)

:: ────────────────────────────────────────────────────────────
:: STEP 4: Generate the AGENT_PROMPTS.md cheat sheet
:: ────────────────────────────────────────────────────────────
echo [4/6] Generating AGENT_PROMPTS.md...
(
echo # Antigravity Agent Prompts — %ProjectName%
echo.
echo ^> Copy-paste these exact prompts into the Antigravity chat as you build.
echo ^> Full workflow: see .agents/workflows/master-flow.md
echo.
echo ## Step 0.5: Competitor Research
echo ```
echo "Read https://COMPETITOR-SITE.com/ and produce a Market Intelligence Report
echo  covering messaging, SEO structure, design patterns, and trust signals.
echo  Use the report to inform DESIGN.md and initial screen prompts."
echo ```
echo.
echo ## Step 0.7: Generate Hero Assets
echo ```
echo "Generate a hero image for %ProjectName%. Premium dark aesthetic,
echo  matching the docs/DESIGN.md color palette."
echo ```
echo.
echo ## Step 1: Pull Lovable Visuals
echo ```powershell
echo git fetch origin master ^^^&^^^& git pull origin master --ff-only
echo ```
echo.
echo ## Step 2: Wire Firebase
echo ```
echo "Review the new React components in src/. Replace all mock data with
echo  real-time listeners using Firebase v9 SDK. Use getFirestore^(^) and
echo  onSnapshot^(^) so the dashboard updates live."
echo ```
echo.
echo ## Step 3: Jules Heavy Lift
echo ```powershell
echo /jules "Run a comprehensive security audit on the entire codebase.
echo  Look for exposed API keys, XSS vulnerabilities, and insecure
echo  Firestore rules. Patch them and submit a Pull Request."
echo ```
echo.
echo ## Step 4: QA Audit
echo ```
echo "Run a QA audit: scan for missing ARIA labels, heading hierarchy,
echo  alt text, meta descriptions, and lazy loading. Fix automatically."
echo ```
echo.
echo ## Step 5: Verify Locally
echo ```
echo "Navigate to http://localhost:3000. Take a screenshot of the login
echo  page and check the console for Firebase permission errors."
echo ```
echo.
echo ## Step 6: Deploy
echo ```powershell
echo npm run build ^^^&^^^& npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
echo git add -A ^^^&^^^& git commit -m "feat: wired UI to live Firebase backend" ^^^&^^^& git push origin master
echo ```
) > AGENT_PROMPTS.md
echo     [OK] AGENT_PROMPTS.md created.

:: ────────────────────────────────────────────────────────────
:: STEP 5: Update PROJECT_SPEC.md with project name
:: ────────────────────────────────────────────────────────────
echo [5/6] Personalizing PROJECT_SPEC.md...
if exist "docs\PROJECT_SPEC.md" (
    powershell -Command "(Get-Content 'docs\PROJECT_SPEC.md') -replace 'YOUR_PROJECT_NAME', '%ProjectName%' -replace 'Nexus AI Platform', '%ProjectName%' | Set-Content 'docs\PROJECT_SPEC.md'"
    echo     [OK] PROJECT_SPEC.md updated with project name.
) else (
    echo     [SKIP] No PROJECT_SPEC.md found.
)

:: ────────────────────────────────────────────────────────────
:: STEP 6: Open in Antigravity
:: ────────────────────────────────────────────────────────────
echo [6/6] Opening project in Antigravity...
echo.
echo ========================================================
echo   SUCCESS! Project "%ProjectName%" is ready.
echo ========================================================
echo.
echo   Location:  %ProjectPath%
echo   Template:  Design (28 docs + 6 configs)
echo   Reference: reference\ (platform-integration docs)
echo   Prompts:   AGENT_PROMPTS.md (8-step cheat sheet)
echo.
echo   Next: Open Antigravity and follow master-flow.md
echo ========================================================
echo.

code .

timeout /t 3 >nul
exit /b 0
