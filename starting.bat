@echo off
start /b cmd /c "cd ./front/ && ng serve"
start /b cmd /c "cd ./back/ && node server.js"