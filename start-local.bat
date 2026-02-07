@echo off
echo Installing backend dependencies...
cd backend
pip install -r requirements.txt
echo.
echo Starting backend on http://localhost:8000
start cmd /k "uvicorn app.main:app --reload"
cd ..

timeout /t 3 /nobreak >nul

echo Installing frontend dependencies...
cd cosmic-watch-frontend
call npm install
echo.
echo Starting frontend on http://localhost:3000
start cmd /k "npm start"
cd ..

echo.
echo ========================================
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo ========================================
