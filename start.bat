@echo off
setlocal EnableExtensions EnableDelayedExpansion
cls

echo ========================================================
echo   Antigravity Portable Framework Bootstrapper
echo   Copies the starter kit + reusable reference docs
echo ========================================================
echo.

set "SCRIPT_DIR=%~dp0"
set "STARTER_SRC=%SCRIPT_DIR%starter-kit"
set "REFERENCE_DIR=%SCRIPT_DIR%reference"

if not exist "%STARTER_SRC%" (
    echo [ERROR] starter-kit was not found next to this script.
    echo         Expected: %STARTER_SRC%
    pause
    exit /b 1
)

if not exist "%REFERENCE_DIR%" mkdir "%REFERENCE_DIR%" >nul 2>nul

set "DEFAULT_TARGET=%USERPROFILE%\Documents\AntigravityProjects"
if not exist "%USERPROFILE%\Documents" set "DEFAULT_TARGET=%CD%"

set /p ProjectName="Enter your new project name (e.g. my-new-app): "
if "%ProjectName%"=="" (
    echo [ERROR] Project name cannot be empty.
    pause
    exit /b 1
)

set /p TargetDir="Target directory [default: %DEFAULT_TARGET%]: "
if "%TargetDir%"=="" set "TargetDir=%DEFAULT_TARGET%"

if not exist "%TargetDir%" mkdir "%TargetDir%" >nul 2>nul
if not exist "%TargetDir%" (
    echo [ERROR] Could not create target directory: %TargetDir%
    pause
    exit /b 1
)

set "ProjectPath=%TargetDir%\%ProjectName%"
if exist "%ProjectPath%" (
    echo [ERROR] Folder "%ProjectPath%" already exists.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo   Creating: %ProjectPath%
echo ========================================================
echo.

echo [1/5] Copying portable starter kit...
xcopy "%STARTER_SRC%\*" "%ProjectPath%\\" /E /H /C /I /Q >nul
if errorlevel 1 (
    echo [ERROR] Failed to copy starter kit.
    pause
    exit /b 1
)
echo     [OK] starter-kit copied.

echo [2/5] Copying reusable reference docs...
mkdir "%ProjectPath%\reference" >nul 2>nul
for %%f in (
    README.md
    PROMPT_TO_PORTAL.md
    QUICK_START.md
    AUTH_FLOW.md
    JULES_INTEGRATION.md
    STITCH_DESIGN.md
    VERCEL_DEPLOYMENT.md
    NEW_PROJECT_GUIDE.md
    INDEX.md
) do (
    if exist "%SCRIPT_DIR%%%f" copy /Y "%SCRIPT_DIR%%%f" "%ProjectPath%\reference\%%f" >nul
)
if exist "%SCRIPT_DIR%configs" xcopy "%SCRIPT_DIR%configs\*" "%ProjectPath%\reference\configs\\" /E /H /C /I /Q >nul
if exist "%SCRIPT_DIR%scripts" xcopy "%SCRIPT_DIR%scripts\*" "%ProjectPath%\reference\scripts\\" /E /H /C /I /Q >nul
if exist "%SCRIPT_DIR%workflows" xcopy "%SCRIPT_DIR%workflows\*" "%ProjectPath%\reference\workflows\\" /E /H /C /I /Q >nul
echo     [OK] reference docs copied.

echo [3/5] Creating local env placeholders...
cd /d "%ProjectPath%"
if exist ".env.example" if not exist ".env.local" copy /Y ".env.example" ".env.local" >nul
if exist "web\.env.example" if not exist "web\.env.local" copy /Y "web\.env.example" "web\.env.local" >nul
echo     [OK] local env templates prepared.

echo [4/5] Personalising project docs...
if exist "docs\PROJECT_SPEC.md" (
    powershell -NoProfile -ExecutionPolicy Bypass -Command "(Get-Content 'docs\PROJECT_SPEC.md') -replace 'YOUR_PROJECT_NAME', '%ProjectName%' -replace 'Nexus AI Platform', '%ProjectName%' | Set-Content 'docs\PROJECT_SPEC.md'"
)
if exist "docs\CURRENT_STATUS.md" (
    powershell -NoProfile -ExecutionPolicy Bypass -Command "$d=(Get-Date -Format 'yyyy-MM-dd'); $c=Get-Content 'docs\CURRENT_STATUS.md'; $c=$c -replace 'YOUR_PROJECT_NAME','%ProjectName%'; $c=$c -replace 'Last Updated: .*','Last Updated: '+$d; Set-Content 'docs\CURRENT_STATUS.md' $c"
)
echo     [OK] docs prepared.

echo [5/5] Next step summary...
echo.
echo ========================================================
echo   SUCCESS: %ProjectName% is ready for Antigravity
echo ========================================================
echo   Location:  %ProjectPath%
echo   Start here: %ProjectPath%\README.md
echo   Then run:  .\init.ps1
echo   Reference: %ProjectPath%\reference\INDEX.md
echo ========================================================
echo.
echo Recommended next actions:
echo   1. Open the new folder in Antigravity.
echo   2. Run .\init.ps1 and fill .env.local values.
echo   3. Configure Antigravity MCP from reference\configs\mcp_config.json.reference.
echo.

where code >nul 2>nul
if not errorlevel 1 code "%ProjectPath%"

exit /b 0
