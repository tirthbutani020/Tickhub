// Get event type and ID from URL
const urlParams = new URLSearchParams(window.location.search);
const eventType = urlParams.get('type');
const eventId = urlParams.get('id');

function showDate(dateId) {
    // Hide all date sections
    let allShows = document.querySelectorAll('.show-day');
    allShows.forEach(show => show.style.display = 'none');

    // Show the selected date's shows
    document.getElementById(dateId).style.display = 'block';
}

// Update booking links based on event type
window.onload = function() {
    const showTimeButtons = document.querySelectorAll('.showtimes a');
    showTimeButtons.forEach(link => {
        if (eventType === 'concert') {
            link.href = `concert-booking.html?id=${eventId}`;
        } else {
            link.href = `seat-booking.html?id=${eventId}`;
        }
    });
};
