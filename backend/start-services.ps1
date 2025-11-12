# Start Both Backend Services
# This script runs both the Python gait service and Node.js API server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CVACare - Starting Backend Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the backend directory
$currentDir = Get-Location
if (-not $currentDir.Path.EndsWith("backend")) {
    Write-Host "ERROR: Please run this script from the backend directory" -ForegroundColor Red
    Write-Host "Current directory: $currentDir" -ForegroundColor Yellow
    Write-Host "Run: cd backend" -ForegroundColor Yellow
    exit 1
}

# Check if dependencies are installed
Write-Host "Checking dependencies..." -ForegroundColor Yellow
$axiosInstalled = npm list axios 2>&1 | Select-String "axios@"
if (-not $axiosInstalled) {
    Write-Host "⚠ axios not found. Run setup-gait-service.ps1 first" -ForegroundColor Yellow
    $response = Read-Host "Do you want to run setup now? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        .\setup-gait-service.ps1
    } else {
        exit 1
    }
}
Write-Host ""

# Function to check if port is in use
function Test-Port {
    param([int]$Port)
    $connection = Test-NetConnection -ComputerName localhost -Port $Port -InformationLevel Quiet -WarningAction SilentlyContinue
    return $connection
}

# Check ports
Write-Host "Checking ports..." -ForegroundColor Yellow
if (Test-Port 5000) {
    Write-Host "⚠ Port 5000 is already in use" -ForegroundColor Yellow
    $response = Read-Host "Kill the process and continue? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        $process = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
        Stop-Process -Id $process -Force
        Start-Sleep -Seconds 2
    }
}

if (Test-Port 5001) {
    Write-Host "⚠ Port 5001 is already in use" -ForegroundColor Yellow
    $response = Read-Host "Kill the process and continue? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        $process = Get-NetTCPConnection -LocalPort 5001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
        Stop-Process -Id $process -Force
        Start-Sleep -Seconds 2
    }
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Starting Services..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Start Python service in a new window
Write-Host "[1/2] Starting Python Gait Analysis Service (Port 5001)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentDir\gait-analysis'; python app.py" -WindowStyle Normal
Start-Sleep -Seconds 3

# Check if Python service started
if (Test-Port 5001) {
    Write-Host "✓ Python service is running on http://localhost:5001" -ForegroundColor Green
} else {
    Write-Host "⚠ Python service might not have started" -ForegroundColor Yellow
}
Write-Host ""

# Start Node.js service in a new window
Write-Host "[2/2] Starting Node.js API Server (Port 5000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$currentDir'; npm run dev" -WindowStyle Normal
Start-Sleep -Seconds 3

# Check if Node.js service started
if (Test-Port 5000) {
    Write-Host "✓ Node.js service is running on http://localhost:5000" -ForegroundColor Green
} else {
    Write-Host "⚠ Node.js service might not have started" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Services Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Both services are running in separate windows:" -ForegroundColor Cyan
Write-Host "  • Python Gait Service: http://localhost:5001" -ForegroundColor White
Write-Host "  • Node.js API Server: http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "Test the integration:" -ForegroundColor Yellow
Write-Host "  curl http://localhost:5000/api/gait/health" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop the services" -ForegroundColor Gray
Write-Host ""
