@echo off
setlocal EnableDelayedExpansion
cls

echo ============================================================
echo   Nexus AI ^& Platform Integration — Full Bootstrap v3.0
echo   Merges: Portals/Design  +  platform-integration
echo ============================================================
echo.

:: ─────────────────────────────────────────────────────────────
:: SOURCE PATHS — Update these if your repos move
:: ─────────────────────────────────────────────────────────────
set "DESIGN_SRC=C:\Users\yuryz\Documents\GitHub\Portals\Design"
set "PI_SRC=C:\Users\yuryz\Documents\GitHub\Samples\platform-integration"

:: ─────────────────────────────────────────────────────────────
:: VALIDATE SOURCES EXIST
:: ─────────────────────────────────────────────────────────────
echo [CHECK] Verifying source directories...

if not exist "%DESIGN_SRC%" (
    echo [ERROR] Design template not found:
    echo         %DESIGN_SRC%
    echo         Update DESIGN_SRC at the top of this script.
    pause & exit /b 1
)
if not exist "%PI_SRC%" (
    echo [ERROR] Platform integration not found:
    echo         %PI_SRC%
    echo         Update PI_SRC at the top of this script.
    pause & exit /b 1
)
echo         [OK] Both sources found.
echo.

:: ─────────────────────────────────────────────────────────────
:: ASK FOR PROJECT NAME AND DESTINATION
:: ─────────────────────────────────────────────────────────────
set /p ProjectName="Enter new project name (e.g., my-saas-app): "
if "!ProjectName!"=="" (
    echo [ERROR] Project name cannot be empty.
    pause & exit /b 1
)

echo.
echo   A folder picker dialog will now open — choose where to create the project.
echo   (If the dialog does not appear, check your taskbar.)
echo.

:: Launch native Windows folder picker — write temp .ps1 to avoid bat quoting issues
set "PICKER=%TEMP%\nexus_folder_picker.ps1"
(
    echo Add-Type -AssemblyName System.Windows.Forms
    echo $dlg = New-Object System.Windows.Forms.FolderBrowserDialog
    echo $dlg.Description = 'Select the PARENT folder for your new project'
    echo $dlg.RootFolder  = 'MyComputer'
    echo $dlg.SelectedPath = [Environment]::GetFolderPath('MyDocuments'^)
    echo $dlg.ShowNewFolderButton = $true
    echo if ($dlg.ShowDialog(^) -eq 'OK'^) { $dlg.SelectedPath } else { '__CANCELLED__' }
) > "!PICKER!"

set "TargetDir="
for /f "usebackq delims=" %%D in (`powershell -NoProfile -ExecutionPolicy Bypass -File "!PICKER!"`) do (
    set "TargetDir=%%D"
)
del "!PICKER!" 2>nul

if "!TargetDir!"=="__CANCELLED__" (
    echo [ABORT] No folder selected. Re-run the script to try again.
    pause & exit /b 1
)
if "!TargetDir!"=="" (
    echo [ERROR] Could not open folder picker. Please re-run the script.
    pause & exit /b 1
)

echo       [OK] Target folder: !TargetDir!

set "DEST=!TargetDir!\!ProjectName!"

if exist "!DEST!" (
    echo [ERROR] Folder already exists: !DEST!
    echo         Choose a different name or delete the existing folder.
    pause & exit /b 1
)

echo.
echo ============================================================
echo   Creating: !DEST!
echo ============================================================
echo.

:: ─────────────────────────────────────────────────────────────
:: Write a single shared xcopy exclude file to TEMP
:: ─────────────────────────────────────────────────────────────
set "EXCL=%TEMP%\nexus_xcopy_exclude.txt"
(
    echo .next\
    echo node_modules\
    echo .ai\
    echo .sessions\
    echo .codebase-map
    echo .codebase-map.db
    echo .codebase-map.db-shm
    echo .codebase-map.db-wal
    echo .codebase-map.lock
    echo .env.local
    echo build_err
    echo build_result
    echo dev_server.log
    echo test_results.txt
    echo ts_errors
    echo _archive\
    echo _backup_
    echo Ctemptestproject\
    echo tsconfig.tsbuildinfo
    echo package-lock.json
    echo .git\
    echo .mcp\
    echo error_page.html
    echo fix-conflicts.js
    echo payload.txt
    echo openai.txt
) > "!EXCL!"

:: ─────────────────────────────────────────────────────────────
:: STEP 1 — Copy Portals/Design marketing template (src/)
:: ─────────────────────────────────────────────────────────────
echo [1/9] Copying design template (marketing site)...
xcopy "!DESIGN_SRC!\src" "!DEST!\src\" /E /H /C /I /Q /EXCLUDE:!EXCL! 2>nul
echo       [OK] src\  (Next.js marketing pages)

:: ─────────────────────────────────────────────────────────────
:: STEP 2 — Copy _platform/ (full platform reference)
:: ─────────────────────────────────────────────────────────────
echo [2/9] Copying full platform reference (_platform/)...
xcopy "!DESIGN_SRC!\_platform" "!DEST!\_platform\" /E /H /C /I /Q /EXCLUDE:!EXCL! 2>nul
echo       [OK] _platform\  (auth, DB, CMS, AI routes — merge selectively)

:: ─────────────────────────────────────────────────────────────
:: STEP 3 — Copy root config files from Portals/Design
:: ─────────────────────────────────────────────────────────────
echo [3/9] Copying root config files...
for %%f in (
    next.config.ts
    package.json
    tsconfig.json
    tsconfig.build.json
    tailwind.config.ts
    postcss.config.js
    .eslintrc.json
    .prettierrc
    .gitignore
    .env.example
    vercel.json
    firebase.json
    firestore.rules
    vitest.config.ts
    apphosting.yaml
    CHANGELOG.md
    README.md
    QUICK_START.md
    SETUP.md
) do (
    if exist "!DESIGN_SRC!\%%f" (
        copy /Y "!DESIGN_SRC!\%%f" "!DEST!\%%f" >nul 2>nul
    )
)
echo       [OK] next.config.ts, package.json, tailwind.config.ts, firebase.json, vercel.json, etc.

:: ─────────────────────────────────────────────────────────────
:: STEP 4 — Copy .firebaserc
:: ─────────────────────────────────────────────────────────────
if exist "!DESIGN_SRC!\.firebaserc" (
    copy /Y "!DESIGN_SRC!\.firebaserc" "!DEST!\.firebaserc" >nul 2>nul
)
echo       [OK] .firebaserc

:: ─────────────────────────────────────────────────────────────
:: STEP 5 — Copy docs/ from Portals/Design (all prompt guides, specs, design tokens)
:: ─────────────────────────────────────────────────────────────
echo [4/9] Copying docs/ (all guides, prompt files, design tokens)...
xcopy "!DESIGN_SRC!\docs" "!DEST!\docs\" /E /H /C /I /Q /EXCLUDE:!EXCL! 2>nul
echo       [OK] docs\  (DESIGN.md, PROJECT_SPEC.md, all prompt guides, tasks, etc.)

:: ─────────────────────────────────────────────────────────────
:: STEP 6 — Copy .agents/ and .lovable/ (IDE expansion rules + Lovable system prompt)
:: ─────────────────────────────────────────────────────────────
echo [5/9] Copying agent config (.agents/, .lovable/)...
xcopy "!DESIGN_SRC!\.agents" "!DEST!\.agents\" /E /H /C /I /Q /EXCLUDE:!EXCL! 2>nul
xcopy "!DESIGN_SRC!\.lovable" "!DEST!\.lovable\" /E /H /C /I /Q /EXCLUDE:!EXCL! 2>nul
echo       [OK] .agents\  (IDE_EXPANSION_RULES.md + master-flow.md workflow)
echo       [OK] .lovable\  (system.md Lovable system prompt)

:: ─────────────────────────────────────────────────────────────
:: STEP 7 — Copy .github/ CI/CD workflows
:: ─────────────────────────────────────────────────────────────
echo [6/9] Copying CI/CD (.github/workflows/)...
xcopy "!DESIGN_SRC!\.github" "!DEST!\.github\" /E /H /C /I /Q /EXCLUDE:!EXCL! 2>nul
echo       [OK] .github\  (ci.yml, deploy.yml, codeql.yml, release.yml)

:: ─────────────────────────────────────────────────────────────
:: STEP 8 — Copy platform-integration reference docs -> reference\
:: ─────────────────────────────────────────────────────────────
echo [7/9] Copying platform-integration reference docs...
mkdir "!DEST!\reference" 2>nul
for %%f in (
    INDEX.md
    README.md
    PROMPT_TO_PORTAL.md
    QUICK_START.md
    AUTH_FLOW.md
    JULES_INTEGRATION.md
    GOOGLE_AI_STUDIO.md
    STITCH_DESIGN.md
    VERCEL_DEPLOYMENT.md
    NEW_PROJECT_GUIDE.md
    UI_PROJECT_REFERENCE.md
) do (
    if exist "!PI_SRC!\%%f" copy /Y "!PI_SRC!\%%f" "!DEST!\reference\%%f" >nul
)
xcopy "!PI_SRC!\configs"   "!DEST!\reference\configs\"   /E /H /C /I /Q /EXCLUDE:!EXCL! 2>nul
xcopy "!PI_SRC!\workflows" "!DEST!\reference\workflows\" /E /H /C /I /Q /EXCLUDE:!EXCL! 2>nul
xcopy "!PI_SRC!\scripts"   "!DEST!\reference\scripts\"   /E /H /C /I /Q /EXCLUDE:!EXCL! 2>nul
echo       [OK] reference\  (INDEX.md, AUTH_FLOW.md, STITCH_DESIGN.md, configs, workflows, scripts)

:: ─────────────────────────────────────────────────────────────
:: STEP 9 — Copy platform-integration starter-kit -> skeleton\
:: ─────────────────────────────────────────────────────────────
echo [8/9] Copying starter-kit skeleton...
xcopy "!PI_SRC!\starter-kit" "!DEST!\skeleton\" /E /H /C /I /Q /EXCLUDE:!EXCL! 2>nul
echo       [OK] skeleton\  (init.ps1, functions/api-gateway, web/, specs/, ui/)

:: ─────────────────────────────────────────────────────────────
:: STEP 10 — Personalize PROJECT_SPEC.md
:: ─────────────────────────────────────────────────────────────
echo [9/9] Personalizing docs\PROJECT_SPEC.md...
if exist "!DEST!\docs\PROJECT_SPEC.md" (
    powershell -Command "(Get-Content '!DEST!\docs\PROJECT_SPEC.md') -replace 'Nexus AI Platform','!ProjectName!' -replace 'YOUR_PROJECT_NAME','!ProjectName!' | Set-Content '!DEST!\docs\PROJECT_SPEC.md'"
    echo       [OK] PROJECT_SPEC.md personalized for !ProjectName!
) else (
    echo       [SKIP] docs\PROJECT_SPEC.md not found.
)

:: ─────────────────────────────────────────────────────────────
:: GENERATE: .env.local (blank copy of .env.example)
:: ─────────────────────────────────────────────────────────────
if exist "!DEST!\.env.example" (
    if not exist "!DEST!\.env.local" (
        copy /Y "!DEST!\.env.example" "!DEST!\.env.local" >nul
        echo       [OK] .env.local created from .env.example (fill in your secrets)
    )
)

:: ─────────────────────────────────────────────────────────────
:: GENERATE: AGENT_PROMPTS.md — cheat sheet for this project
:: ─────────────────────────────────────────────────────────────
(
echo # Agent Prompts Cheat Sheet — !ProjectName!
echo.
echo ^> Copy-paste these into the Antigravity chat as you build.
echo ^> Full workflow: .agents/workflows/master-flow.md
echo.
echo ---
echo.
echo ## 0. Initial Setup
echo ```
echo "Read docs/PROJECT_SPEC.md and docs/DESIGN.md. Confirm you understand the
echo  project name, tech stack, and design constraints before proceeding."
echo ```
echo.
echo ## 0.5. Competitor Research
echo ```
echo "Read https://COMPETITOR-SITE.com/ and produce a Market Intelligence Report
echo  covering messaging, SEO structure, design patterns, and trust signals.
echo  Save to docs/COMPETITOR_RESEARCH.md."
echo ```
echo.
echo ## 0.7. Generate Hero Assets
echo ```
echo "Generate a hero image for !ProjectName!. Premium dark aesthetic,
echo  matching the docs/DESIGN.md color palette and brand voice."
echo ```
echo.
echo ## 1. Pull Lovable Visuals
echo ```powershell
echo git fetch origin master ^&^& git pull origin master --ff-only
echo ```
echo.
echo ## 2. Activate Full Platform (optional — if you need auth/DB/CMS)
echo ```powershell
echo # Merge _platform/ into active src/
echo xcopy /E /I /Y "_platform\src" ".\src"
echo # Then: configure .env.local and run npm install
echo ```
echo.
echo ## 3. Wire Firebase / Supabase
echo ```
echo "Review the new React components in src/. Replace all mock data with
echo  real-time listeners. Use Firebase v9 onSnapshot() or Supabase realtime
echo  subscriptions. Ensure auth is wired to Firebase Auth or next-auth."
echo ```
echo.
echo ## 4. Jules Heavy Lift (async, large changes)
echo ```powershell
echo /jules "Run a comprehensive security audit. Look for exposed API keys,
echo  XSS, insecure Firestore rules, and OWASP Top 10. Patch and submit PR."
echo ```
echo.
echo ## 5. QA Audit
echo ```
echo "Run a QA audit: ARIA labels, heading hierarchy, alt text, meta
echo  descriptions, lazy loading, contrast ratios. Fix all issues automatically."
echo ```
echo.
echo ## 6. Verify
echo ```
echo "Navigate to http://localhost:3000. Screenshot the homepage and check
echo  for console errors. Confirm Firebase auth and DB connections work."
echo ```
echo.
echo ## 7. Deploy
echo ```powershell
echo npm run build
echo npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
echo git add -A ^&^& git commit -m "feat: wired to live backend" ^&^& git push origin master
echo ```
) > "!DEST!\AGENT_PROMPTS.md"

:: ─────────────────────────────────────────────────────────────
:: UPDATE CURRENT_STATUS.md
:: ─────────────────────────────────────────────────────────────
(
echo # !ProjectName! — Current Status
echo.
echo **Created**: %date% %time%
echo **Bootstrapped from**: Portals/Design + platform-integration v3.0
echo.
echo ## Status: SETUP IN PROGRESS
echo.
echo ## Next Actions
echo.
echo 1. Fill in `.env.local` with your secrets (see `.env.example` for all vars^)
echo 2. Fill in `docs/PROJECT_SPEC.md` with your project purpose and domain
echo 3. Update `docs/DESIGN.md` with your brand colors and typography
echo 4. Run `npm install` in the project root
echo 5. Run `npm run dev` to verify the marketing site builds
echo 6. Optionally merge `_platform/src` into `src/` if you need auth/DB/CMS
echo.
echo ## Architecture
echo.
echo - `src/app/^(marketing^)/`  — Active marketing pages (builds clean^)
echo - `_platform/`              — Full platform reference (auth, DB, CMS, AI^)
echo - `docs/`                   — All guides, design tokens, prompt files
echo - `reference/`              — platform-integration how-to docs
echo - `skeleton/`               — starter-kit templates (functions, web^)
echo - `.agents/workflows/`      — Antigravity workflows
echo - `.lovable/system.md`      — Lovable system prompt
) > "!DEST!\docs\CURRENT_STATUS.md"

:: ─────────────────────────────────────────────────────────────
:: DONE
:: ─────────────────────────────────────────────────────────────
echo.
echo ============================================================
echo   SUCCESS! "!ProjectName!" is ready.
echo ============================================================
echo.
echo   Location : !DEST!
echo.
echo   Structure:
echo     src\              Design template (marketing, always builds)
echo     _platform\        Full platform reference (auth, DB, CMS, AI)
echo     docs\             All guides + prompt files (28 docs)
echo     reference\        platform-integration how-to docs + configs
echo     skeleton\         Starter-kit (functions/, web/, ui/)
echo     .agents\          Antigravity workflows + IDE expansion rules
echo     .lovable\         Lovable system prompt
echo     .github\          CI/CD workflows
echo.
echo   Key files:
echo     AGENT_PROMPTS.md        Cheat sheet of copy-paste prompts
echo     docs\PROJECT_SPEC.md    Fill in your purpose + domain
echo     docs\DESIGN.md          Fill in your brand tokens
echo     .env.local              Fill in your secrets
echo.
echo   Next: cd into the folder and run: npm install
echo   Then open Antigravity and follow: .agents\workflows\master-flow.md
echo ============================================================
echo.

:: Open in VS Code / Antigravity if available
where code >nul 2>nul && code "!DEST!" || echo [NOTE] 'code' not in PATH — open the folder manually.

timeout /t 3 >nul
endlocal
exit /b 0
