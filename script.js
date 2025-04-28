// Add event listeners to all Book Tickets buttons
document.addEventListener('DOMContentLoaded', function() {
    const bookButtons = document.querySelectorAll('.book-btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get movie details from the parent elements
            const movieCard = this.closest('.movie');
            const movieTitle = movieCard.querySelector('h3').textContent;
            const movieDetails = movieCard.querySelector('.detail').textContent;
            
            // Store movie information in localStorage
            localStorage.setItem('selectedMovie', movieTitle);
            localStorage.setItem('movieDetails', movieDetails);
            
            // Redirect to theater selection page
            window.location.href = 'seat-booking.html';
        });
    });
});

for (let i = 0; i < 4;i++) {
    
}