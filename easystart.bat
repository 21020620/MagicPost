@echo off
cd FE/client
echo Starting FE...
start cmd /k "npm run dev"
cd ../..

cd BE
echo Starting BE...
start cmd /k "npm run start"
cd ..