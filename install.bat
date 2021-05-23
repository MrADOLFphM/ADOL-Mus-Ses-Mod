@echo off
echo Make sure you have nodejs v14 or higher installed (installing depencies...)
call npm i -save
if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)