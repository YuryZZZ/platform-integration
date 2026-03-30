@echo off
setlocal EnableDelayedExpansion
cls

echo ========================================================
echo   Antigravity "One Interface" Master Flow Initializer
echo ========================================================
echo.

:: Ask for the new project name
set /p ProjectName="Enter your new project name (e.g., my-new-app): "

:: Validate input
if "%ProjectName%"=="" (
    echo [ERROR] Project name cannot be empty.
    pause
    exit /b
)

:: Ensure it doesn't already exist
if exist "%ProjectName%" (
    echo [ERROR] Folder "%ProjectName%" already exists! Please choose another name.
    pause
    exit /b
)

echo.
echo [*] Step 1: Creating directory "%ProjectName%"...
mkdir "%ProjectName%"

echo [*] Step 2: Copying the enterprise starter-kit...
xcopy "starter-kit\*" "%ProjectName%\" /E /H /C /I /Q

:: Navigate into the new project
cd "%ProjectName%"

echo [*] Step 3: Running init.ps1 to securely prepare the environment...
powershell.exe -ExecutionPolicy Bypass -File "init.ps1"

echo [*] Step 4: Generating AGENT_PROMPTS.md for your Antigravity chat...
(
echo # Your Antigravity Workflow Prompts
echo.
echo Keep this file open. Copy and paste these exact prompts into your Antigravity chat window as you build.
echo.
echo ## 1. Pull the Visuals ^(GitHub ^<- Lovable^)
echo Run this in the Antigravity Terminal:
echo ```powershell
echo git fetch origin master ^&^& git pull origin master --ff-only
echo ```
echo.
echo ## 2. Wire the Brains ^(Antigravity + Firebase^)
echo Paste this into the Antigravity Chat:
echo ```text
echo "Review the new React components I just pulled from Lovable in the web/src/ directory. Please rip out all the hardcoded mock data and replace it with real-time listeners using the Firebase v9 SDK. Ensure we are using getFirestore() and onSnapshot() so the dashboard updates live."
echo ```
echo.
echo ## 3. Heavy Lift / Deep Audit ^(Jules^)
echo Run this in the Antigravity Terminal:
echo ```powershell
echo /jules "Run a comprehensive security audit on the entire codebase, looking for exposed API keys, XSS vulnerabilities in the Lovable React components, and insecure Firestore rules. If you find any, patch them and submit a Pull Request."
echo ```
echo.
echo ## 4. Verify Locally
echo Paste this into the Antigravity Chat:
echo ```text
echo "Navigate the browser to http://localhost:3000. Take a screenshot of the login page to verify the Lovable UI looks correct, and check the browser console to ensure there are no Firebase database permission errors."
echo ```
echo.
echo ## 5. Go Live
echo Run this in the Antigravity Terminal:
echo ```powershell
echo npm run build ^&^& npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
echo git add -A ^&^& git commit -m "feat: wired Lovable UI to live Firebase backend" ^&^& git push origin master
echo ```
) > AGENT_PROMPTS.md

echo.
echo ========================================================
echo   SUCCESS! All set up.
echo ========================================================
echo [*] Opening your new project in Antigravity...
echo.

:: Open the code editor
code .

:: Pause so the user can read final output before closing
timeout /t 3 >nul
exit /b
