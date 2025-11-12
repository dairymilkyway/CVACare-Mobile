# CVACare Mobile - Setup Validator
# This script checks if your setup is correct before building

Write-Host "==================================" -ForegroundColor Cyan
Write-Host " CVACare Setup Validator" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# Check Node.js
Write-Host "[Checking Prerequisites]" -ForegroundColor Yellow
Write-Host ""

if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found!" -ForegroundColor Red
    $errors++
}

if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "✓ npm installed: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "✗ npm not found!" -ForegroundColor Red
    $errors++
}

Write-Host ""

# Check Backend
Write-Host "[Checking Backend Configuration]" -ForegroundColor Yellow
Write-Host ""

$backendEnv = ".\backend\.env"
if (Test-Path $backendEnv) {
    Write-Host "✓ .env file exists" -ForegroundColor Green
    
    # Read .env and check for placeholders
    $envContent = Get-Content $backendEnv -Raw
    
    if ($envContent -match "your_mailtrap_username") {
        Write-Host "⚠ Mailtrap credentials not configured (still using placeholder)" -ForegroundColor Yellow
        $warnings++
    } else {
        Write-Host "✓ Mailtrap credentials configured" -ForegroundColor Green
    }
    
    if ($envContent -match "your_jwt_secret_key_here_change_in_production") {
        Write-Host "⚠ JWT_SECRET still using default value (should be changed)" -ForegroundColor Yellow
        $warnings++
    } else {
        Write-Host "✓ JWT_SECRET has been customized" -ForegroundColor Green
    }
    
    if ($envContent -match "MONGODB_URI") {
        Write-Host "✓ MongoDB URI configured" -ForegroundColor Green
    } else {
        Write-Host "✗ MongoDB URI not found in .env" -ForegroundColor Red
        $errors++
    }
} else {
    Write-Host "✗ .env file not found in backend folder!" -ForegroundColor Red
    $errors++
}

$backendPackage = ".\backend\package.json"
if (Test-Path $backendPackage) {
    Write-Host "✓ Backend package.json exists" -ForegroundColor Green
} else {
    Write-Host "✗ Backend package.json not found!" -ForegroundColor Red
    $errors++
}

$backendModules = ".\backend\node_modules"
if (Test-Path $backendModules) {
    Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠ Backend node_modules not found (run 'npm install' in backend folder)" -ForegroundColor Yellow
    $warnings++
}

Write-Host ""

# Check Frontend
Write-Host "[Checking Frontend Configuration]" -ForegroundColor Yellow
Write-Host ""

$apiFile = ".\frontend\services\api.js"
if (Test-Path $apiFile) {
    Write-Host "✓ api.js file exists" -ForegroundColor Green
    
    # Read api.js and check API_URL
    $apiContent = Get-Content $apiFile -Raw
    
    if ($apiContent -match "const API_URL = '([^']+)'") {
        $apiUrl = $matches[1]
        Write-Host "  Current API URL: $apiUrl" -ForegroundColor Cyan
        
        if ($apiUrl -match "localhost") {
            Write-Host "⚠ API URL uses 'localhost' - this won't work on a physical phone!" -ForegroundColor Yellow
            Write-Host "  Change to your computer's IP address (e.g., http://192.168.1.100:5000/api)" -ForegroundColor Yellow
            $warnings++
        } elseif ($apiUrl -match "http://192\.168\." -or $apiUrl -match "http://10\.") {
            Write-Host "✓ API URL uses local network IP (good for development)" -ForegroundColor Green
        } elseif ($apiUrl -match "https://") {
            Write-Host "✓ API URL uses production server (HTTPS)" -ForegroundColor Green
        } else {
            Write-Host "⚠ API URL format looks unusual, please verify it's correct" -ForegroundColor Yellow
            $warnings++
        }
    }
} else {
    Write-Host "✗ api.js file not found!" -ForegroundColor Red
    $errors++
}

$frontendPackage = ".\frontend\package.json"
if (Test-Path $frontendPackage) {
    Write-Host "✓ Frontend package.json exists" -ForegroundColor Green
} else {
    Write-Host "✗ Frontend package.json not found!" -ForegroundColor Red
    $errors++
}

$frontendModules = ".\frontend\node_modules"
if (Test-Path $frontendModules) {
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠ Frontend node_modules not found (run 'npm install' in frontend folder)" -ForegroundColor Yellow
    $warnings++
}

$googleServices = ".\frontend\android\app\google-services.json"
if (Test-Path $googleServices) {
    Write-Host "✓ google-services.json exists for Android" -ForegroundColor Green
} else {
    Write-Host "⚠ google-services.json not found (needed for Firebase features)" -ForegroundColor Yellow
    $warnings++
}

Write-Host ""

# Check Network
Write-Host "[Checking Network Configuration]" -ForegroundColor Yellow
Write-Host ""

try {
    $ipAddress = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi*" | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*"}).IPAddress
    if ($ipAddress) {
        Write-Host "✓ Local IP Address detected: $ipAddress" -ForegroundColor Green
        Write-Host "  Make sure this matches the IP in frontend/services/api.js" -ForegroundColor Cyan
    } else {
        Write-Host "⚠ Could not detect WiFi IP address" -ForegroundColor Yellow
        $warnings++
    }
} catch {
    Write-Host "⚠ Could not detect network information" -ForegroundColor Yellow
    $warnings++
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host " Validation Summary" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "✓ All checks passed! You're ready to build!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Start backend: cd backend; npm run dev" -ForegroundColor White
    Write-Host "2. Build app: cd frontend; eas build --profile development --platform android" -ForegroundColor White
} elseif ($errors -eq 0) {
    Write-Host "⚠ Setup is mostly complete, but there are $warnings warning(s)" -ForegroundColor Yellow
    Write-Host "  Review the warnings above before proceeding" -ForegroundColor Yellow
} else {
    Write-Host "✗ Found $errors error(s) and $warnings warning(s)" -ForegroundColor Red
    Write-Host "  Please fix the errors above before building" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
