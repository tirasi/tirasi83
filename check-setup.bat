@echo off
echo Checking prerequisites...
echo.

echo [1/2] Checking Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker NOT installed
    echo    Download: https://www.docker.com/products/docker-desktop/
) else (
    echo ✅ Docker installed
)

echo.
echo [2/2] Checking Docker running...
docker ps >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker NOT running - Start Docker Desktop
) else (
    echo ✅ Docker running
)

echo.
echo ========================================
pause
