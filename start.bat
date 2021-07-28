@ECHO OFF
title ServerSMP - BOT
:Minecraft
echo.
echo ====================================
echo Starting the server up. Please allow
echo the server some time to start.
echo ====================================
echo.
node index.js
echo.
echo ====================================
echo Press CTRL+C to close this startup
echo script.
echo.
echo Restarting in:
echo ====================================
echo.
timeout 5
ping 1.1.1.1 -n 1 -w 3000 >nul
goto Minecraft