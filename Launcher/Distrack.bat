@echo off
title React + .NET App
echo Starting the application...

:: Navigate to the frontend folder
cd /d ../frontend

:: Run npm start to start concurrently
npm run start

:: Wait for the process to finish
pause
