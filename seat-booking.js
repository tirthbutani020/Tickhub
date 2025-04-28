// Movie data object with information for each movie
const movieData = {
    'pushpa2': {
        title: 'Pushpa-2',
        date: 'March 15, 2024',
        time: '7:30 PM',
        theater: 'INOX'
    },
    'skyforce': {
        title: 'Sky Force',
        date: 'March 16, 2024',
        time: '6:30 PM',
        theater: 'INOX'
    },
    'fastx': {
        title: 'Fast X',
        date: 'March 17, 2024',
        time: '8:00 PM',
        theater: 'INOX'
    },
    'yjhd': {
        title: 'Yeh Jawaani Hai Deewani',
        date: 'March 18, 2024',
        time: '5:30 PM',
        theater: 'INOX'
    },
    'babyjohn': {
        title: 'Baby John',
        date: 'March 19, 2024',
        time: '7:00 PM',
        theater: 'INOX'
    },
    'divine': {
        title: 'DIVINE',
        date: 'March 10, 2024',
        time: '5:00 PM',
        theater: 'INOX'
    },
    'adityagadhvi': {
        title: 'ADITYA GADHVI',
        date: 'March 22, 2024',
        time: '5:00 PM',
        theater: 'INOX'
    },
    'kailashkher': {
        title: 'KAILASH KHER',
        date: 'March 1, 2024',
        time: '7:00 PM',
        theater: 'INOX'
    },
    'monalithakur': {
        title: 'MONALI THAKUR',
        date: 'March 8, 2024',
        time: '7:00 PM',
        theater: 'INOX'
    },
    'anuvjain': {
        title: 'ANUV JAIN',
        date: 'March 15, 2024',
        time: '5:00 PM',
        theater: 'INOX'
    }
};

const theaters = {
    'pvr': {
        name: 'PVR Cinemas (Anand)',
        capacity: 280,
        type: 'Multiplex'
    },
    'inox': {
        name: 'INOX Cinemas - Ahmedabad',
        capacity: 320,
        type: 'Multiplex'
    },
    'cinepolis': {
        name: 'Cinepolis - Gandhinagar',
        capacity: 300,
        type: 'Multiplex'
    },
    'rajhans': {
        name: 'Rajhans Cinemas - Vadodara',
        capacity: 260,
        type: 'Multiplex'
    },
    'newfangled': {
        name: 'Newfangled Miniplex (Twin Seat) - Motera',
        capacity: 120,
        type: 'Premium Miniplex'
    }
};

// Function to get movie ID from URL
function getMovieIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'pushpa2'; // Default to Pushpa-2 if no ID is provided
}

// Function to update the movie information
function updateMovieInfo() {
    const movieId = getMovieIdFromUrl();
    const movie = movieData[movieId];
    
    if (!movie) {
        console.error('Movie not found:', movieId);
        return;
    }
    
    // Update movie title and details
    document.getElementById('movieTitle').textContent = movie.title;
    document.getElementById('movieDate').textContent = `Date: ${movie.date}`;
    document.getElementById('movieTime').textContent = `Time: ${movie.time}`;
    document.getElementById('movieTheater').textContent = `Theater: ${movie.theater}`;
    
    // Update page title
    document.title = `Book Seats - ${movie.title}`;
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', updateMovieInfo);

function updateTheater() {
    const theaterSelect = document.getElementById('theater');
    const selectedTheater = theaters[theaterSelect.value];
    
    if (selectedTheater) {
        // Hide theater selection and show theater details
        document.getElementById('theaterSelectionSection').style.display = 'none';
        document.getElementById('theaterDetailsSection').style.display = 'block';
        
        // Update theater details
        document.getElementById('theaterName').textContent = selectedTheater.name;
        document.getElementById('theaterCapacity').textContent = selectedTheater.capacity;
        document.getElementById('theaterType').textContent = selectedTheater.type;
        
        // Show date selection and time slots
        document.querySelector('.date-selection').style.display = 'flex';
        document.getElementById('showTimings').style.display = 'block';
    }
}

// Handle date selection
document.querySelectorAll('.date-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove selected class from all date buttons
        document.querySelectorAll('.date-btn').forEach(btn => btn.classList.remove('selected'));
        // Add selected class to clicked button
        this.classList.add('selected');
    });
});

// Handle time slot selection
document.querySelectorAll('.time-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove selected class from all time buttons
        document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('selected'));
        // Add selected class to clicked button
        this.classList.add('selected');
    });
}); 