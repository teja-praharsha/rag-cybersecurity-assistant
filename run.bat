@echo off
setlocal
title RAG Cybersecurity Assistant
cd /d "%~dp0"

echo ==========================================================
echo   RAG Cybersecurity Assistant - Initializing Environment  
echo ==========================================================

if exist ".venv\Scripts\python.exe" goto venv_ready

echo [1/3] Creating Python virtual environment: .venv
py -m venv .venv 2>nul || python -m venv .venv
if not exist ".venv\Scripts\python.exe" (
    echo Error: Failed to create virtual environment. Ensure Python is installed.
    pause
    exit /b 1
)

:venv_ready
echo [1/3] Python virtual environment ready.

echo [2/3] Checking dependencies in backend\requirements.txt
".venv\Scripts\python.exe" -m pip install --quiet -r "backend\requirements.txt"

echo [3/3] Starting FastAPI and RAG Assistant...
echo.
echo   Dashboard:  http://127.0.0.1:8000
echo   Swagger UI: http://127.0.0.1:8000/docs
echo.
echo Press Ctrl+C to terminate the server.
echo ----------------------------------------------------------

".venv\Scripts\python.exe" -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
pause
