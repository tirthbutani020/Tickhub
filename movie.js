// Movie data object with information for each movie
const movieData = {
    'pushpa2': {
        title: 'Pushpa-2',
        duration: '3h 30m',
        genre: 'Action, Drama',
        language: 'Hindi',
        director: 'Sukumar',
        cast: 'Allu Arjun, Rashmika Mandanna, Rao Ramesh',
        rating: '9.8/10',
        synopsis: 'The clash is on as Pushpa and Bhanwar Singh continue their rivalry in this epic conclusion to the two-parted action drama.',
        poster: 'images/movie1.jpeg',
        background: 'images/movie1-bg.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=gQDo5QuZTaw'  // Pushpa 2 Official Teaser
    },
    'skyforce': {
        title: 'Sky Force',
        duration: '2h 45m',
        genre: 'Action, War, Aerial',
        language: 'Hindi',
        director: 'Aditya Datt',
        cast: 'Akshay Kumar, Nimrat Kaur, Pankaj Tripathi',
        rating: '8.5/10',
        synopsis: 'A high-octane aerial action film based on the Indian Air Force\'s daring mission to rescue hostages from a hijacked plane.',
        poster: 'images/movie2.jpg',
        background: 'images/movie2-bg.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=CgruxokrhjQ&ab_channel=JioStudios'  // Sky Force Official Trailer
    },
    'fastx': {
        title: 'Fast X',
        duration: '2h 30m',
        genre: 'Action, Adventure, Crime',
        language: 'English',
        director: 'Louis Leterrier',
        cast: 'Vin Diesel, Jason Momoa, Michelle Rodriguez',
        rating: '7.9/10',
        synopsis: 'Dom Toretto and his family face their most lethal opponent yet in this high-stakes adventure.',
        poster: 'images/movie3.jpeg',
        background: 'images/movie3-bg.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=1uDl6cjH6Mc&ab_channel=UniversalPicturesIndia'  // Fast X Official Trailer
    },
    'yjhd': {
        title: 'Yeh Jawaani Hai Deewani',
        duration: '2h 40m',
        genre: 'Romantic Comedy, Drama',
        language: 'Hindi',
        director: 'Ayan Mukerji',
        cast: 'Ranbir Kapoor, Deepika Padukone, Aditya Roy Kapur',
        rating: '8.2/10',
        synopsis: 'A story of friendship, love, and self-discovery as a group of friends reunite after years apart.',
        poster: 'images/movie4.jpg',
        background: 'images/movie4-bg.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=Rbp2XUSeUNE&ab_channel=DharmaProductions'  // YJHD Official Trailer
    },
    'babyjohn': {
        title: 'Baby John',
        duration: '2h 35m',
        genre: 'Action, Drama',
        language: 'Hindi',
        director: 'Ali Abbas Zafar',
        cast: 'Varun Dhawan, Keerthy Suresh, Jackie Shroff',
        rating: '7.5/10',
        synopsis: 'A young man\'s journey of revenge and redemption as he battles against a powerful crime syndicate.',
        poster: 'images/movie5.jpeg',
        background: 'images/movie5-bg.jpg',
        trailerLink: 'https://www.youtube.com/watch?v=qyRn3rPRw8w&t=10s&ab_channel=JioStudios'  // Baby John Teaser
    },
//     'divine': {
//         title: 'DIVINE',
//         duration: '3h 30m',
//         genre: 'Hip Hop, Concert',
//         language: 'Hindi, English',
//         director: 'N/A',
//         cast: 'DIVINE, MC Altaf, Naezy',
//         rating: '9.5/10',
//         synopsis: 'Experience the electrifying energy of DIVINE\'s live concert featuring his greatest hits and new tracks.',
//         poster: 'images/Divine.jpg',
//         background: 'images/divine-bg.jpg',
//         trailerLink: 'https://www.youtube.com/watch?v=zYhMcFPzHjY'  // DIVINE - Chal Bombay Music Video
//     },
//     'adityagadhvi': {
//         title: 'ADITYA GADHVI',
//         duration: '3h 30m',
//         genre: 'Gujarati, Folk',
//         language: 'Gujarati',
//         director: 'N/A',
//         cast: 'Aditya Gadhvi',
//         rating: '8.5/10',
//         synopsis: 'A mesmerizing evening of Gujarati folk music with the soulful voice of Aditya Gadhvi.',
//         poster: 'images/aditya_gadhvi.jpg',
//         background: 'images/aditya-bg.jpg',
//         trailerLink: 'https://www.youtube.com/watch?v=TcR-_TLuqes'  // Aditya Gadhvi Performance
//     },
//     'kailashkher': {
//         title: 'KAILASH KHER',
//         duration: '3h',
//         genre: 'Sufi, Hindi',
//         language: 'Hindi',
//         director: 'N/A',
//         cast: 'Kailash Kher',
//         rating: '8.7/10',
//         synopsis: 'An enchanting evening of Sufi music with the legendary voice of Kailash Kher.',
//         poster: 'images/kailash_kher.jpg',
//         background: 'images/kailash-bg.jpg',
//         trailerLink: 'https://www.youtube.com/watch?v=C0L5wBnBHrI'  // Kailash Kher Concert
//     },
//     'monalithakur': {
//         title: 'MONALI THAKUR',
//         duration: '2h',
//         genre: 'Bollywood, Retro',
//         language: 'Hindi',
//         director: 'N/A',
//         cast: 'Monali Thakur',
//         rating: '8.3/10',
//         synopsis: 'A nostalgic journey through Bollywood classics with the versatile voice of Monali Thakur.',
//         poster: 'images/monali_thakur.jpg',
//         background: 'images/monali-bg.jpg',
//         trailerLink: 'https://www.youtube.com/watch?v=E1DUXGhJHqE'  // Monali Thakur Performance
//     },
//     'anuvjain': {
//         title: 'ANUV JAIN',
//         duration: '3h',
//         genre: 'Bollywood, Hindi',
//         language: 'Hindi',
//         director: 'N/A',
//         cast: 'Anuv Jain',
//         rating: '8.8/10',
//         synopsis: 'An intimate evening with the soulful voice of Anuv Jain, featuring his greatest hits and new tracks.',
//         poster: 'images/anuv_jain.jpg',
//         background: 'images/anuv-bg.jpg',
//         trailerLink: 'https://www.youtube.com/watch?v=CWH-Xq_CCy0'  // Anuv Jain - Alag Aasmaan
//     }
// };

// Get the movie ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Create and add the background element
const backgroundElement = document.createElement('div');
backgroundElement.className = 'movie-background';
backgroundElement.setAttribute('data-movie', movieId);
document.body.insertBefore(backgroundElement, document.body.firstChild);

// Function to get movie ID from URL
function getMovieIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'pushpa2'; // Default to Pushpa-2 if no ID is provided
}

// Function to update the movie page with the selected movie's data
function updateMoviePage() {
    const movieId = getMovieIdFromUrl();
    const movie = movieData[movieId];
    
    if (!movie) {
        console.error('Movie not found:', movieId);
        return;
    }
    
    // Update background image
    document.body.style.backgroundImage = `url('${movie.background}')`;
    
    // Update poster and trailer link
    const posterImg = document.querySelector('.poster-container img');
    posterImg.src = movie.poster;
    posterImg.alt = movie.title;
    
    const trailerLink = document.querySelector('.trailer-link');
    trailerLink.href = movie.trailerLink;
    trailerLink.target = '_blank'; // Open trailer in new tab
    
    // Update movie details
    document.querySelector('.details-container h1').textContent = movie.title;
    document.querySelector('.details-container p:nth-child(2)').innerHTML = `<strong>Duration:</strong> ${movie.duration}`;
    document.querySelector('.details-container p:nth-child(3)').innerHTML = `<strong>Genre:</strong> ${movie.genre}`;
    document.querySelector('.details-container p:nth-child(4)').innerHTML = `<strong>Language:</strong> ${movie.language}`;
    document.querySelector('.details-container p:nth-child(5)').innerHTML = `<strong>Director:</strong> ${movie.director}`;
    document.querySelector('.details-container p:nth-child(6)').innerHTML = `<strong>Cast:</strong> ${movie.cast}`;
    document.querySelector('.details-container p:nth-child(7)').innerHTML = `<strong>IMDb Rating:</strong> ⭐ ${movie.rating}`;
    document.querySelector('.details-container p:nth-child(8)').innerHTML = `<strong>Synopsis:</strong> ${movie.synopsis}`;
    
    // Update page title
    document.title = `${movie.title} - Movie Details`;
    
    // Add error handling for images
    posterImg.onerror = function() {
        this.src = 'Web_logo.jpg'; // Fallback image if poster fails to load
    };
    
    // Add error handling for background image
    const bgImage = new Image();
    bgImage.onload = function() {
        document.body.style.backgroundImage = `url('${movie.background}')`;
    };
    bgImage.onerror = function() {
        // If background image fails to load, use a gradient background
        document.body.style.backgroundImage = 'linear-gradient(to bottom, #1a1a1a, #333333)';
    };
    bgImage.src = movie.background;
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', updateMoviePage); 