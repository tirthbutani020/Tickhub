document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value
            };

            try {
                const response = await fetch('/submit-profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Profile created successfully!');
                    window.location.href = '/'; // Redirect to home page
                } else {
                    alert(data.error || 'Error creating profile');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while creating your profile');
            }
        });
    }

    // Handle booking form submissions
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const bookingType = document.getElementById('bookingType').value;
            const formData = {
                date: localStorage.getItem('selectedDate'),
                time: localStorage.getItem('selectedTime'),
                seats: JSON.parse(localStorage.getItem('selectedSeats') || '[]')
            };

            if (bookingType === 'movie') {
                formData.movieName = localStorage.getItem('selectedMovie');
                formData.theater = localStorage.getItem('selectedTheater');
                endpoint = '/book-movie';
            } else {
                formData.concertName = localStorage.getItem('selectedConcert');
                formData.venue = localStorage.getItem('selectedTheater');
                endpoint = '/book-concert';
            }

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Booking successful!');
                    // Clear localStorage
                    localStorage.removeItem('selectedDate');
                    localStorage.removeItem('selectedTime');
                    localStorage.removeItem('selectedSeats');
                    localStorage.removeItem('selectedTheater');
                    window.location.href = '/';
                } else {
                    alert(data.error || 'Error processing booking');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while processing your booking');
            }
        });
    }
});

async function loadProfiles() {
    try {
        const response = await fetch('http://localhost:5000/getProfiles');
        const users = await response.json();

        const userProfiles = document.getElementById('userProfiles');
        if (userProfiles) {
            userProfiles.innerHTML = '';

            users.forEach(user => {
                userProfiles.innerHTML += `
                    <div>
                        <img src="http://localhost:5000${user.profilePic}" width="100">
                        <p>Name: ${user.name}</p>
                        <p>Email: ${user.email}</p>
                        <p>Phone: ${user.phone}</p>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error('Error loading profiles:', error);
    }
} 