@echo off
cd /d "%~dp0"
echo Ridemitraa — server start ho raha hai, browser ~8 second me khulega...
start "" cmd /c "timeout /t 8 /nobreak >nul && start http://localhost:3000"
npm run dev
