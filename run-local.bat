@echo off
echo ========================================
echo   Running Cosmic Watch Locally
echo ========================================
echo.

echo Starting Backend...
start cmd /k "cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload"

timeout /t 5 /nobreak >nul

echo Starting Frontend...
start cmd /k "cd cosmic-watch-frontend && npm install && npm start"

echo.
echo Services starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause
