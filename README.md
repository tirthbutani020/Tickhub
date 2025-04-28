# TickHub - Movie Ticket Booking System

## Quick Start
1. Right-click `setup.bat` and select "Run as Administrator"
2. The script will automatically:
   - Start MongoDB
   - Install dependencies
   - Start the server

## Manual Setup (if setup.bat fails)

### First-time Setup
1. Install MongoDB Community Server:
   - Download from: https://www.mongodb.com/try/download/community
   - Choose "Complete" installation
   - Install MongoDB Compass when prompted
   - Make sure "Install MongoDB as a Service" is checked

2. Install Node.js:
   - Download from: https://nodejs.org/
   - Choose LTS version
   - Run the installer with default options

3. Install dependencies:
```bash
npm install
```

### Starting the Application
1. Start MongoDB service:
   - Open PowerShell as Administrator
   - Run: `net start MongoDB`

2. Start the server:
```bash
npm run dev
```

3. Access the application:
   - Open http://localhost:5501 in your browser
   - The server will automatically restart when you make changes

## Troubleshooting

### MongoDB Won't Start
1. Open Services (Win + R, type "services.msc")
2. Find "MongoDB"
3. Right-click → Properties
4. Set "Startup type" to "Automatic"
5. Click "Start"
6. Click "Apply" → "OK"

### Port 5501 Already in Use
1. Open PowerShell as Administrator
2. Run: `netstat -ano | findstr :5501`
3. Note the PID (last number)
4. Run: `taskkill /PID <PID> /F`

### Database Connection Issues
1. Open MongoDB Compass
2. Connect to: mongodb://localhost:27017
3. Create database "tickhub" if it doesn't exist

## Project Structure
```
tickhub/
├── public/           # Static files
├── uploads/          # User uploaded files
├── server.js         # Main server file
├── setup.bat         # Setup script
├── package.json      # Dependencies
└── .env             # Environment variables
```

## Environment Variables (.env)
```
PORT=5501
MONGODB_URI=mongodb://localhost:27017/tickhub
JWT_SECRET=tickhub_secret_key_2024
NODE_ENV=development
```

## API Endpoints
- POST /signup - Create new account
- POST /login - User authentication
- GET /profile - Get user profile (protected)
- POST /book-seats - Book movie seats (protected)
- POST /verify-payment - Process payment
- GET /payments - View payment history

## Development
- Server auto-restarts on file changes
- API testing: Use Postman or browser DevTools
- Database management: Use MongoDB Compass

## Background Images for Movies

To complete the movie trailer section, you need to create background images for each movie. Here's how to do it:

### Required Background Images

1. `movie1-bg.jpg` - For Pushpa-2
2. `movie2-bg.jpg` - For Sky Force
3. `movie3-bg.jpg` - For Fast X
4. `movie4-bg.jpg` - For Yeh Jawaani Hai Deewani
5. `movie5-bg.jpg` - For Baby John
6. `divine-bg.jpg` - For DIVINE
7. `aditya-bg.jpg` - For ADITYA GADHVI
8. `kailash-bg.jpg` - For KAILASH KHER
9. `monali-bg.jpg` - For MONALI THAKUR
10. `anuv-bg.jpg` - For ANUV JAIN

### How to Create Background Images

1. Find high-quality images related to each movie/artist
2. Resize them to 1920x1080 pixels (or similar 16:9 aspect ratio)
3. Apply a slight blur or darken effect to ensure text remains readable
4. Save them with the filenames listed above
5. Place them in the root directory of the project

### Image Sources

You can find suitable images from:
- Official movie posters
- Movie stills
- Concert photos
- Artist promotional images

### Alternative Solution

If you can't create the background images immediately, the system will fall back to a dark gradient background. You can add the images later without changing any code.

## Running the Application

1. Start the server:
   ```
   node server.js
   ```

2. Open the application in your browser:
   ```
   http://localhost:5000
   ```

## Features

- Movie and event listings
- Seat booking system
- User authentication
- Movie details with trailers
- Responsive design 