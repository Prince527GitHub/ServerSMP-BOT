@ECHO OFF
title ServerSMP - BOT
:Robot
echo.
echo ====================================
echo Starting the bot up. Please allow
echo the bot some time to start.
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
goto Robot