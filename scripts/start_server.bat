@echo off
title MechSage Backend
echo.
echo  ====================================================
echo   MechSage - Predictive Maintenance AI
echo  ====================================================
echo.
echo  Starting FastAPI backend on http://localhost:8001
echo  Open your browser at: http://localhost:8001
echo.
echo  Press Ctrl+C to stop the server.
echo.
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
