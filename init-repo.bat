@echo off
REM Election Cart Frontend - Repository Initialization Script
REM This script helps set up the repository after cloning

echo.
echo ================================
echo Election Cart Frontend Setup
echo ================================
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo Creating .env.local from .env.example...
    copy .env.example .env.local
    echo [OK] .env.local created
    echo [!] Please update .env.local with your actual values
) else (
    echo [OK] .env.local already exists
)

echo.

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    echo [OK] Dependencies installed
) else (
    echo [OK] Dependencies already installed
)

echo.
echo ================================
echo Setup complete!
echo ================================
echo.
echo Next steps:
echo 1. Update .env.local with your API URL and Razorpay key
echo 2. Make sure the backend is running
echo 3. Run: npm run dev
echo.
echo For more information, see SETUP.md
echo.
pause
