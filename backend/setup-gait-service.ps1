# Setup Gait Analysis Service
# This script installs dependencies for both Node.js and Python backends

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CVACare - Gait Analysis Setup" -ForegroundColor Cyan
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

# Step 1: Install Node.js dependencies
Write-Host "[1/4] Installing Node.js dependencies..." -ForegroundColor Yellow
Write-Host "Installing axios for Python service communication..." -ForegroundColor Gray
npm install axios
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install Node.js dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 2: Check Python installation
Write-Host "[2/4] Checking Python installation..." -ForegroundColor Yellow
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.8 or higher from https://www.python.org/downloads/" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ Found: $pythonVersion" -ForegroundColor Green
Write-Host ""

# Step 3: Install Python dependencies
Write-Host "[3/4] Installing Python dependencies..." -ForegroundColor Yellow
Write-Host "Installing Flask, numpy, scipy, and Flask-CORS..." -ForegroundColor Gray
Set-Location gait-analysis
pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install Python dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..
Write-Host "✓ Python dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 4: Verify installation
Write-Host "[4/4] Verifying installation..." -ForegroundColor Yellow
$axiosInstalled = npm list axios 2>&1 | Select-String "axios@"
if ($axiosInstalled) {
    Write-Host "✓ axios installed: $axiosInstalled" -ForegroundColor Green
} else {
    Write-Host "⚠ Warning: axios might not be installed correctly" -ForegroundColor Yellow
}

# Test Python imports
Write-Host "Testing Python dependencies..." -ForegroundColor Gray
$pythonTest = python -c "import flask, numpy, scipy; print('OK')" 2>&1
if ($pythonTest -eq "OK") {
    Write-Host "✓ All Python packages working" -ForegroundColor Green
} else {
    Write-Host "⚠ Warning: Python package test failed" -ForegroundColor Yellow
}
Write-Host ""

# Success message
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Start the Python gait service:" -ForegroundColor White
Write-Host "   cd gait-analysis" -ForegroundColor Gray
Write-Host "   python app.py" -ForegroundColor Gray
Write-Host ""
Write-Host "2. In a new terminal, start the Node.js backend:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Test the integration:" -ForegroundColor White
Write-Host "   curl http://localhost:5000/api/gait/health" -ForegroundColor Gray
Write-Host ""
Write-Host "The Python service runs on port 5001" -ForegroundColor Yellow
Write-Host "The Node.js service runs on port 5000" -ForegroundColor Yellow
Write-Host ""
