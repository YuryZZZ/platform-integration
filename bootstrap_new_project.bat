@echo off
setlocal
cls

echo ========================================================
echo   Legacy Bootstrap Redirect
echo ========================================================
echo.
echo This repository now uses start.bat as the single supported
echo Windows bootstrap entry point.
echo.

set "SCRIPT_DIR=%~dp0"
set "START_SCRIPT=%SCRIPT_DIR%start.bat"

if not exist "%START_SCRIPT%" (
    echo [ERROR] start.bat was not found next to this script.
    echo         Expected: %START_SCRIPT%
    pause
    exit /b 1
)

echo Redirecting to start.bat...
echo.
call "%START_SCRIPT%"
exit /b %ERRORLEVEL%
