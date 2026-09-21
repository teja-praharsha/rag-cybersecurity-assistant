# RAG Cybersecurity Assistant - Windows PowerShell Startup Script
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  RAG Cybersecurity Assistant - Initializing Environment  " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Virtual Environment Setup
$VenvPython = Join-Path $PSScriptRoot ".venv\Scripts\python.exe"

if (!(Test-Path $VenvPython)) {
    Write-Host "[1/3] Creating Python virtual environment (.venv)..." -ForegroundColor Yellow
    if (Get-Command py -ErrorAction SilentlyContinue) {
        py -m venv .venv
    } elseif (Get-Command python -ErrorAction SilentlyContinue) {
        python -m venv .venv
    } else {
        Write-Error "Python 3 is required but neither 'py' nor 'python' was found in PATH."
    }
} else {
    Write-Host "[1/3] Virtual environment (.venv) detected." -ForegroundColor Green
}

# 2. Dependency Verification
Write-Host "[2/3] Checking dependencies in backend\requirements.txt..." -ForegroundColor Yellow
& $VenvPython -m pip install --quiet -r "backend\requirements.txt"

# 3. Launch Server
Write-Host "[3/3] Starting FastAPI & RAG Assistant..." -ForegroundColor Green
Write-Host ""
Write-Host "  Dashboard:  http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host "  Swagger UI: http://127.0.0.1:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to terminate the server." -ForegroundColor Gray
Write-Host "----------------------------------------------------------" -ForegroundColor DarkGray

& $VenvPython -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
