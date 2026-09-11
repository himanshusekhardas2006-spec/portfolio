@echo off
title Himanshu Portfolio - Dev Server
color 0A

echo.
echo  ╔══════════════════════════════════════════╗
echo  ║     HIMANSHU SEKHAR DAS - PORTFOLIO      ║
echo  ║          Starting Dev Server...          ║
echo  ╚══════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo  [*] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Node.js is not installed or not in PATH!
    pause
    exit /b 1
)

echo  [*] Installing dependencies if needed...
if not exist "node_modules" (
    echo  [*] node_modules not found. Running npm install...
    npm install
)

echo.
echo  [*] Starting Next.js dev server...
echo  [*] Open your browser at: http://localhost:3000
echo.

npm run dev

pause
