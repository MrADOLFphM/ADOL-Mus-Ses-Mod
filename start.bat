@echo off

echo Starting the bot (need node.js v14 or higher to run)
call node src/index.js

if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)