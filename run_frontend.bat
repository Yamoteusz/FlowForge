@echo off
echo Activating virtual environment...
cd frontend

echo Starting Frontend server...
python -m http.server 8080

pause
