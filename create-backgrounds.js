const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// List of movies and their corresponding poster images
const movies = [
    { id: 'pushpa2', poster: 'movie1.jpeg', bg: 'movie1-bg.jpg' },
    { id: 'skyforce', poster: 'movie2.jpg', bg: 'movie2-bg.jpg' },
    { id: 'fastx', poster: 'movie3.jpeg', bg: 'movie3-bg.jpg' },
    { id: 'yjhd', poster: 'movie4.jpg', bg: 'movie4-bg.jpg' },
    { id: 'babyjohn', poster: 'movie5.jpeg', bg: 'movie5-bg.jpg' },
    { id: 'divine', poster: 'Divine.jpg', bg: 'divine-bg.jpg' },
    { id: 'adityagadhvi', poster: 'aditya_gadhvi.jpg', bg: 'aditya-bg.jpg' },
    { id: 'kailashkher', poster: 'kailash_kher.jpg', bg: 'kailash-bg.jpg' },
    { id: 'monalithakur', poster: 'monali_thakur.jpg', bg: 'monali-bg.jpg' },
    { id: 'anuvjain', poster: 'anuv_jain.jpg', bg: 'anuv-bg.jpg' }
];

// Function to create a background image from a poster
async function createBackgroundImage(posterPath, bgPath) {
    try {
        // Check if the poster exists
        if (!fs.existsSync(posterPath)) {
            console.log(`Poster not found: ${posterPath}`);
            return false;
        }

        // Load the poster image
        const poster = await loadImage(posterPath);
        
        // Create a canvas with 16:9 aspect ratio (1920x1080)
        const canvas = createCanvas(1920, 1080);
        const ctx = canvas.getContext('2d');
        
        // Fill with a dark background
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Calculate dimensions to maintain aspect ratio
        const aspectRatio = poster.width / poster.height;
        let drawWidth, drawHeight, x, y;
        
        if (aspectRatio > 16/9) {
            // Image is wider than 16:9
            drawHeight = canvas.height;
            drawWidth = drawHeight * aspectRatio;
            x = (canvas.width - drawWidth) / 2;
            y = 0;
        } else {
            // Image is taller than 16:9
            drawWidth = canvas.width;
            drawHeight = drawWidth / aspectRatio;
            x = 0;
            y = (canvas.height - drawHeight) / 2;
        }
        
        // Draw the poster image
        ctx.drawImage(poster, x, y, drawWidth, drawHeight);
        
        // Add a dark overlay to make text more readable
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add a subtle blur effect
        ctx.filter = 'blur(10px)';
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
        
        // Draw the original image again on top (centered)
        ctx.drawImage(poster, x, y, drawWidth, drawHeight);
        
        // Save the background image
        const buffer = canvas.toBuffer('image/jpeg');
        fs.writeFileSync(bgPath, buffer);
        
        console.log(`Created background image: ${bgPath}`);
        return true;
    } catch (error) {
        console.error(`Error creating background for ${posterPath}:`, error);
        return false;
    }
}

// Main function to process all movies
async function processAllMovies() {
    console.log('Starting to create background images...');
    
    for (const movie of movies) {
        await createBackgroundImage(movie.poster, movie.bg);
    }
    
    console.log('Finished creating background images!');
}

// Run the script
processAllMovies(); 