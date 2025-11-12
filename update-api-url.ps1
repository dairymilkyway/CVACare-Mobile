# CVACare Mobile - API URL Configuration Script
# This script helps you update the API URL in the frontend

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "CVACare Mobile - API URL Updater" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Get local IP address
Write-Host "Detecting your local IP address..." -ForegroundColor Yellow
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi*" | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*"}).IPAddress

if ($ipAddress) {
    Write-Host "Detected IP Address: $ipAddress" -ForegroundColor Green
} else {
    Write-Host "Could not auto-detect IP. Please enter manually." -ForegroundColor Yellow
    $ipAddress = Read-Host "Enter your computer's IP address"
}

# Get port
$port = Read-Host "Enter backend port (press Enter for default: 5000)"
if ([string]::IsNullOrWhiteSpace($port)) {
    $port = "5000"
}

# Construct API URL
$apiUrl = "http://${ipAddress}:${port}/api"

Write-Host ""
Write-Host "New API URL will be: $apiUrl" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "Update api.js with this URL? (Y/N)"

if ($confirm -eq "Y" -or $confirm -eq "y") {
    # Path to api.js
    $apiFilePath = ".\frontend\services\api.js"
    
    if (Test-Path $apiFilePath) {
        # Read the file
        $content = Get-Content $apiFilePath -Raw
        
        # Replace the API_URL line
        $pattern = "const API_URL = '.*';"
        $replacement = "const API_URL = '$apiUrl';"
        $newContent = $content -replace $pattern, $replacement
        
        # Write back to file
        Set-Content $apiFilePath $newContent -NoNewline
        
        Write-Host ""
        Write-Host "✓ Successfully updated API URL!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Make sure backend server is running (npm run dev in backend folder)" -ForegroundColor White
        Write-Host "2. Rebuild your app with: eas build --profile development --platform android" -ForegroundColor White
        Write-Host "3. Install the new APK on your phone" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "Error: Could not find api.js file at $apiFilePath" -ForegroundColor Red
    }
} else {
    Write-Host "Update cancelled." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
