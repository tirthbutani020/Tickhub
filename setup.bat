@echo off
echo Starting TickHub Setup...

:: Check MongoDB installation paths
set MONGO_PATH="C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
set MONGO_DATA="C:\data\db"

:: Create data directory if it doesn't exist
if not exist %MONGO_DATA% (
    echo Creating MongoDB data directory...
    mkdir %MONGO_DATA%
)

:: Try to start MongoDB directly
echo Starting MongoDB...
start "" %MONGO_PATH% --dbpath %MONGO_DATA%
if errorlevel 1 (
    echo.
    echo Failed to start MongoDB. Please check if MongoDB is installed correctly:
    echo 1. Download MongoDB from https://www.mongodb.com/try/download/community
    echo 2. Run the installer and choose "Complete" installation
    echo 3. Make sure the installation path is correct: %MONGO_PATH%
    echo.
    pause
    exit /b 1
)

:: Wait for MongoDB to initialize
echo Waiting for MongoDB to start...
timeout /t 5 /nobreak >nul

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

:: Start the server
echo Starting TickHub server...
call npm run dev 