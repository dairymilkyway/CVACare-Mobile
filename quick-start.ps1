# CVACare Mobile - Quick Start Script
# This script helps you start the backend and frontend quickly

param(
    [switch]$BackendOnly,
    [switch]$FrontendOnly
)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "   CVACare Mobile - Quick Start   " -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $scriptDir "backend"
$frontendDir = Join-Path $scriptDir "frontend"

# Function to check if a command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

if (-not (Test-Command "node")) {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Command "npm")) {
    Write-Host "✗ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Node.js and npm are installed" -ForegroundColor Green
Write-Host ""

# Start Backend
if (-not $FrontendOnly) {
    Write-Host "=== Starting Backend Server ===" -ForegroundColor Cyan
    
    if (Test-Path $backendDir) {
        # Check if .env exists
        $envFile = Join-Path $backendDir ".env"
        if (-not (Test-Path $envFile)) {
            Write-Host "✗ .env file not found in backend directory!" -ForegroundColor Red
            Write-Host "  Please create .env file with your configuration." -ForegroundColor Yellow
            exit 1
        }
        
        # Check if node_modules exists
        $nodeModules = Join-Path $backendDir "node_modules"
        if (-not (Test-Path $nodeModules)) {
            Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
            Push-Location $backendDir
            npm install
            Pop-Location
        }
        
        Write-Host "Starting backend server..." -ForegroundColor Green
        Write-Host "Backend will run on port 5000 (or PORT in .env)" -ForegroundColor White
        Write-Host ""
        
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendDir'; npm run dev"
        
        Write-Host "✓ Backend server started in new window" -ForegroundColor Green
        Start-Sleep -Seconds 2
    } else {
        Write-Host "✗ Backend directory not found!" -ForegroundColor Red
        exit 1
    }
}

# Start Frontend (Expo)
if (-not $BackendOnly) {
    Write-Host ""
    Write-Host "=== Frontend Options ===" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "What would you like to do?" -ForegroundColor Yellow
    Write-Host "1. Start Expo development server (for testing with Expo Go)" -ForegroundColor White
    Write-Host "2. Build development APK with EAS" -ForegroundColor White
    Write-Host "3. Build preview APK with EAS" -ForegroundColor White
    Write-Host "4. Skip frontend" -ForegroundColor White
    Write-Host ""
    
    $choice = Read-Host "Enter your choice (1-4)"
    
    switch ($choice) {
        "1" {
            Write-Host "Starting Expo development server..." -ForegroundColor Green
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendDir'; npx expo start"
            Write-Host "✓ Expo dev server started in new window" -ForegroundColor Green
        }
        "2" {
            Write-Host "Building development APK..." -ForegroundColor Green
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendDir'; eas build --profile development --platform android"
            Write-Host "✓ EAS build started in new window" -ForegroundColor Green
        }
        "3" {
            Write-Host "Building preview APK..." -ForegroundColor Green
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendDir'; eas build --profile preview --platform android"
            Write-Host "✓ EAS build started in new window" -ForegroundColor Green
        }
        "4" {
            Write-Host "Skipping frontend..." -ForegroundColor Yellow
        }
        default {
            Write-Host "Invalid choice. Skipping frontend..." -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "   Setup Complete!   " -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "Important Notes:" -ForegroundColor Yellow
Write-Host "1. Make sure your .env file is properly configured" -ForegroundColor White
Write-Host "2. Update frontend/services/api.js with your IP address" -ForegroundColor White
Write-Host "3. Ensure phone and computer are on the same WiFi network" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
