@echo off
echo Activating virtual environment...
call venv\Scripts\activate

echo Starting FastAPI server...
uvicorn backend.app:app --reload

pause
