# Development startup script for Dilo School Platform
Write-Host "Starting Dilo School Platform Development Environment..." -ForegroundColor Green

# Check if MongoDB is running
Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
try {
    $mongoCheck = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
    if (-not $mongoCheck) {
        Write-Host "MongoDB is not running. Please start MongoDB first." -ForegroundColor Red
        Write-Host "You can start MongoDB with: mongod" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "MongoDB is running ✓" -ForegroundColor Green
} catch {
    Write-Host "Could not check MongoDB status. Please ensure MongoDB is running." -ForegroundColor Red
    exit 1
}

# Start Backend
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend/dilo-backend-main; npm run start:dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd front; npm run dev"

Write-Host "Both servers are starting up..." -ForegroundColor Green
Write-Host "Backend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "API Documentation: http://localhost:8080/docs" -ForegroundColor Cyan
