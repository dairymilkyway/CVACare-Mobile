# ========================================
# CVACare Backend - Unified Startup Script
# ========================================
# This script starts both Node.js and Python services together

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  CVACare Backend Services" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if we're in the backend directory
$currentDir = Get-Location
if (-not $currentDir.Path.EndsWith("backend")) {
    Write-Host "ERROR: Please run this script from the backend directory" -ForegroundColor Red
    Write-Host "Current directory: $currentDir" -ForegroundColor Yellow
    Write-Host "Run: cd backend" -ForegroundColor Yellow
    exit 1
}

# Get local IP address
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*"} | Select-Object -First 1).IPAddress
Write-Host "Local IP Address: $localIP" -ForegroundColor Green
Write-Host "Make sure your .env GAIT_ANALYSIS_URL matches this IP!" -ForegroundColor Yellow
Write-Host ""

# Check .env file
if (Test-Path ".env") {
    $envContent = Get-Content .env -Raw
    if ($envContent -match "GAIT_ANALYSIS_URL=(.+)") {
        $gaitUrl = $matches[1].Trim()
        Write-Host "Current GAIT_ANALYSIS_URL: $gaitUrl" -ForegroundColor Cyan
        
        if ($gaitUrl -match "localhost") {
            Write-Host "[WARN] Using 'localhost' won't work on mobile devices!" -ForegroundColor Yellow
            Write-Host "  Update .env to: GAIT_ANALYSIS_URL=http://${localIP}:5001" -ForegroundColor Yellow
            Write-Host ""
        }
    }
}

# Check if Python venv exists
Write-Host "[1/4] Checking Python virtual environment..." -ForegroundColor Yellow
if (-not (Test-Path "gait-analysis\venv")) {
    Write-Host "[WARN] Virtual environment not found. Creating it..." -ForegroundColor Yellow
    python -m venv gait-analysis\venv
    & gait-analysis\venv\Scripts\Activate.ps1
    pip install --upgrade pip
    pip install -r gait-analysis\requirements.txt
    Write-Host "[OK] Virtual environment created and dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[OK] Virtual environment found" -ForegroundColor Green
}
Write-Host ""

# Check if axios is installed
Write-Host "[2/4] Checking Node.js dependencies..." -ForegroundColor Yellow
$axiosCheck = npm list axios 2>&1
if ($axiosCheck -match "axios@") {
    Write-Host "[OK] axios is installed" -ForegroundColor Green
} else {
    Write-Host "[WARN] axios not found. Installing..." -ForegroundColor Yellow
    npm install axios
    Write-Host "[OK] axios installed" -ForegroundColor Green
}
Write-Host ""

# Check if ports are available
Write-Host "[3/4] Checking ports..." -ForegroundColor Yellow

function Test-Port {
    param([int]$Port)
    $connection = Test-NetConnection -ComputerName localhost -Port $Port -InformationLevel Quiet -WarningAction SilentlyContinue
    return $connection
}

# Check port 5000
if (Test-Port 5000) {
    Write-Host "[WARN] Port 5000 is already in use" -ForegroundColor Yellow
    $response = Read-Host "  Kill the process and continue? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        $process = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
        if ($process) {
            Stop-Process -Id $process -Force
            Start-Sleep -Seconds 2
            Write-Host "  [OK] Process killed" -ForegroundColor Green
        }
    } else {
        Write-Host "Exiting..." -ForegroundColor Red
        exit 1
    }
}

# Check port 5001
if (Test-Port 5001) {
    Write-Host "[WARN] Port 5001 is already in use" -ForegroundColor Yellow
    $response = Read-Host "  Kill the process and continue? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        $process = Get-NetTCPConnection -LocalPort 5001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
        if ($process) {
            Stop-Process -Id $process -Force
            Start-Sleep -Seconds 2
            Write-Host "  [OK] Process killed" -ForegroundColor Green
        }
    } else {
        Write-Host "Exiting..." -ForegroundColor Red
        exit 1
    }
}
Write-Host "[OK] Ports 5000 and 5001 are available" -ForegroundColor Green
Write-Host ""

# Start services
Write-Host "[4/4] Starting services..." -ForegroundColor Yellow
Write-Host ""

# Start Python Flask service
Write-Host "  -> Starting Python Gait Analysis Service (Port 5001)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", @"
Write-Host 'Python Gait Analysis Service' -ForegroundColor Cyan
Write-Host 'Press Ctrl+C to stop' -ForegroundColor Gray
Write-Host ''
cd '$currentDir\gait-analysis'
.\venv\Scripts\Activate.ps1
python app.py
"@ -WindowStyle Normal

Start-Sleep -Seconds 3

# Verify Python service started
if (Test-Port 5001) {
    Write-Host "    [OK] Python service running on http://localhost:5001" -ForegroundColor Green
} else {
    Write-Host "    [WARN] Python service may not have started" -ForegroundColor Yellow
}
Write-Host ""

# Start Node.js Express server
Write-Host "  -> Starting Node.js API Server (Port 5000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", @"
Write-Host 'Node.js API Server' -ForegroundColor Cyan
Write-Host 'Press Ctrl+C to stop' -ForegroundColor Gray
Write-Host ''
cd '$currentDir'
npm run dev
"@ -WindowStyle Normal

Start-Sleep -Seconds 3

# Verify Node.js service started
if (Test-Port 5000) {
    Write-Host "    [OK] Node.js service running on http://localhost:5000" -ForegroundColor Green
} else {
    Write-Host "    [WARN] Node.js service may not have started" -ForegroundColor Yellow
}
Write-Host ""

# Success summary
Write-Host "========================================" -ForegroundColor Green
Write-Host "  All Services Running!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Services are running in separate PowerShell windows:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  [Mobile] Node.js API Server" -ForegroundColor White
Write-Host "     Local: http://localhost:5000" -ForegroundColor Gray
Write-Host "     Network: http://${localIP}:5000" -ForegroundColor Gray
Write-Host ""
Write-Host "  [Gait] Python Gait Service" -ForegroundColor White
Write-Host "     Local: http://localhost:5001" -ForegroundColor Gray
Write-Host "     Network: http://${localIP}:5001" -ForegroundColor Gray
Write-Host ""
Write-Host "Quick Tests:" -ForegroundColor Yellow
Write-Host "  curl http://localhost:5000/api/gait/health" -ForegroundColor Gray
Write-Host "  curl http://localhost:5001/health" -ForegroundColor Gray
Write-Host ""
Write-Host "Mobile App URL:" -ForegroundColor Yellow
Write-Host "  http://${localIP}:5000" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop the services" -ForegroundColor DarkGray
Write-Host ""
