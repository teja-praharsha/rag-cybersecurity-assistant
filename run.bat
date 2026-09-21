@echo off
setlocal enabledelayedexpansion
title RAG Cybersecurity Assistant
cd /d "%~dp0"

echo ==========================================================
echo   RAG Cybersecurity Assistant - Initializing Environment  
echo ==========================================================

if not exist ".venv\Scripts\python.exe" (
    echo [1/3] Creating Python virtual environment (.venv)...
    py -m venv .venv 2>nul || python -m venv .venv
) else (
    echo [1/3] Virtual environment detected.
)

echo [2/3] Checking dependencies in backend\requirements.txt...
".venv\Scripts\python.exe" -m pip install --quiet -r "backend\requirements.txt"

echo [3/3] Starting FastAPI & RAG Assistant...
echo.
echo   Dashboard:  http://127.0.0.1:8000
echo   Swagger UI: http://127.0.0.1:8000/docs
echo.
echo Press Ctrl+C to terminate the server.
echo ----------------------------------------------------------

".venv\Scripts\python.exe" -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
pause
