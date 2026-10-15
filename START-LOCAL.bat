@echo off
setlocal
cd /d "%~dp0"
echo.
echo ===========================================
echo   KAWSER HAMID - LOCAL PORTFOLIO TEST
echo ===========================================
echo.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\start-local.ps1"
if errorlevel 1 (
    echo.
    echo Local setup or server failed. Read the error above.
    pause
)
endlocal
