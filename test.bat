@echo off
echo ========================================
echo   Testing Cosmic Watch Setup
echo ========================================
echo.

echo Testing Backend API...
curl -s http://localhost:8000/health
if errorlevel 1 (
    echo ERROR: Backend is not responding
    echo Make sure containers are running with: docker-compose up
) else (
    echo Backend: OK
)
echo.

echo Testing Frontend...
curl -s -o nul -w "%%{http_code}" http://localhost:3000
if errorlevel 1 (
    echo ERROR: Frontend is not responding
) else (
    echo Frontend: OK
)
echo.

echo Testing API Documentation...
echo Visit: http://localhost:8000/docs
echo.

echo ========================================
echo   Container Status
echo ========================================
docker-compose ps
echo.

pause
