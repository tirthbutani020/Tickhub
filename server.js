const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5501',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB with better error handling
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully');
        console.log('Database URL:', process.env.MONGODB_URI);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Add connection error handler
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    profilePic: String
});

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: String,
    theater: String,
    showtimes: [{
        datetime: Date,
        availableSeats: [String], // Array of seat IDs (e.g., ["A1", "A2", "B1"])
        bookedSeats: [String]     // Array of booked seat IDs
    }]
});

// Booking Schema
const bookingSchema = new mongoose.Schema({
    movieName: String,
    theaterName: String,
    showDate: String,
    showTime: String,
    seats: [String],
    totalAmount: Number,
    transactionId: String,
    ticketNumber: String,
    bookingDate: { type: Date, default: Date.now }
});

// Payment Schema
const paymentSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    movieName: String,
    theaterName: String,
    showDate: String,
    showTime: String,
    seats: [String],
    ticketNumber: String,
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'skipped'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'upi', 'netbanking', 'skipped'],
        default: 'card'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
const Movie = mongoose.model('Movie', movieSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Payment = mongoose.model('Payment', paymentSchema);

// Multer setup for profile picture upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Signup endpoint
app.options('/signup', cors()); // Handle preflight request
app.post('/signup', cors(), express.json(), async (req, res) => {
    try {
        console.log('Signup request received:', req.body);

        const { name, email, password, phone } = req.body;

        // Validate input
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
                fields: {
                    name: !name ? 'Name is required' : null,
                    email: !email ? 'Email is required' : null,
                    password: !password ? 'Password is required' : null,
                    phone: !phone ? 'Phone number is required' : null
                }
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
});

// Login endpoint
app.options('/login', cors()); // Handle preflight request
app.post('/login', cors(), express.json(), async (req, res) => {
    try {
        console.log('Login request received:', req.body);

        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            console.log('Login failed: Missing email or password');
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Login failed: User not found for email:', email);
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log('Login failed: Invalid password for email:', email);
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // Create and assign token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Login successful for user:', email);

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            userId: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Protected route example
app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
});

// API to save user profile
app.post('/saveProfile', upload.single('profilePic'), async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            profilePic: req.file ? `/uploads/${req.file.filename}` : ''
        });

        await newUser.save();
        res.status(201).json({ message: 'Profile saved successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error saving profile', error });
    }
});

// API to get user profiles
app.get('/getProfiles', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profiles', error });
    }
});

// Get movie details
app.get('/movie-details/:movieId', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie details', error });
    }
});

// Get booked seats for a movie showtime
app.get('/booked-seats/:movieId', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const showtime = new Date(req.query.showtime);
        const show = movie.showtimes.find(s => s.datetime.getTime() === showtime.getTime());
        
        if (!show) {
            return res.status(404).json({ message: 'Showtime not found' });
        }

        res.json(show.bookedSeats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booked seats', error });
    }
});

// Book seats
app.post('/book-seats', authenticateToken, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { movieId, showtime, seats } = req.body;
        const userId = req.user.userId;

        // Find movie and check seat availability
        const movie = await Movie.findById(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }

        const show = movie.showtimes.find(s => new Date(s.datetime).getTime() === new Date(showtime).getTime());
        if (!show) {
            throw new Error('Showtime not found');
        }

        // Check if any selected seats are already booked
        const unavailableSeats = seats.filter(seat => show.bookedSeats.includes(seat));
        if (unavailableSeats.length > 0) {
            throw new Error(`Seats ${unavailableSeats.join(', ')} are already booked`);
        }

        // Calculate total amount
        let totalAmount = 0;
        seats.forEach(seat => {
            const row = seat[0];
            const rowIndex = 'ABCDEFGHIJKLMNOPQRST'.indexOf(row);
            if (rowIndex < 3) totalAmount += 1;
            else if (rowIndex < 7) totalAmount += 2;
            else totalAmount += 3;
        });

        // Create booking
        const booking = new Booking({
            movieName: movie.title,
            theaterName: movie.theater,
            showDate: showtime.toLocaleDateString(),
            showTime: showtime.toLocaleTimeString(),
            seats,
            totalAmount
        });
        await booking.save({ session });

        // Update movie's booked seats
        show.bookedSeats.push(...seats);
        await movie.save({ session });

        await session.commitTransaction();
        res.status(201).json({ 
            message: 'Booking successful', 
            bookingId: booking._id,
            totalAmount 
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ message: error.message });
    } finally {
        session.endSession();
    }
});

// Get user's bookings
app.get('/my-bookings', authenticateToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.userId })
            .populate('movieId')
            .sort({ bookingDate: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
});

// Routes for HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/movies', (req, res) => {
    res.sendFile(path.join(__dirname, 'seat-booking.html'));
});

app.get('/concerts', (req, res) => {
    res.sendFile(path.join(__dirname, 'concert-booking.html'));
});

// Profile form submission endpoint
app.post('/submit-profile', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Validate input
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            phone,
            password
        });

        // Save user to database
        await newUser.save();

        res.status(200).json({ message: 'Profile created successfully' });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Booking endpoints
app.post('/book-movie', async (req, res) => {
    try {
        const { movieName, theater, date, time, seats } = req.body;
        // Add your booking logic here
        res.status(200).json({ message: 'Movie booking successful' });
    } catch (error) {
        console.error('Error booking movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/book-concert', async (req, res) => {
    try {
        const { concertName, venue, date, time, seats } = req.body;
        // Add your booking logic here
        res.status(200).json({ message: 'Concert booking successful' });
    } catch (error) {
        console.error('Error booking concert:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Payment verification endpoint
app.post('/verify-payment', async (req, res) => {
    // Start MongoDB session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {
            transactionId,
            paidAmount,
            movieName,
            theaterName,
            showDate,
            showTime,
            selectedSeats,
            totalAmount
        } = req.body;

        // Check if payment already exists
        const existingPayment = await Payment.findOne({ transactionId });
        if (existingPayment) {
            throw new Error('Transaction ID already exists');
        }

        // Validate payment amount
        if (parseFloat(paidAmount) !== parseFloat(totalAmount)) {
            throw new Error('Payment amount does not match the total amount');
        }

        // Generate unique ticket number
        const ticketNumber = 'TIX-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        // Create payment record
        const payment = new Payment({
            transactionId,
            amount: parseFloat(paidAmount),
            movieName,
            theaterName,
            showDate,
            showTime,
            seats: selectedSeats,
            ticketNumber,
            status: 'completed',
            createdAt: new Date()
        });

        // Save payment record with session
        await payment.save({ session });

        // Create booking record
        const booking = new Booking({
            movieName,
            theaterName,
            showDate,
            showTime,
            seats: selectedSeats,
            totalAmount: parseFloat(paidAmount),
            transactionId,
            ticketNumber,
            bookingDate: new Date()
        });

        // Save booking record with session
        await booking.save({ session });

        // Create ticket details for response
        const ticketDetails = {
            ticketNumber,
            movieName,
            theaterName,
            showDate,
            showTime,
            seats: selectedSeats,
            totalAmount: paidAmount,
            transactionId,
            paymentDate: new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'short'
            })
        };

        // Commit the transaction
        await session.commitTransaction();

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Payment verified and ticket generated successfully',
            ticketDetails
        });

    } catch (error) {
        // Abort transaction on error
        await session.abortTransaction();
        
        console.error('Payment verification error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Payment verification failed'
        });
    } finally {
        // End session
        session.endSession();
    }
});

// Skip payment and generate ticket directly
app.post('/skip-payment-generate-ticket', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {
            movieName,
            theaterName,
            showDate,
            showTime,
            selectedSeats,
            totalAmount
        } = req.body;

        // Generate unique ticket number
        const ticketNumber = 'SKIP-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        // Create booking record
        const booking = new Booking({
            movieName,
            theaterName,
            showDate,
            showTime,
            seats: selectedSeats,
            totalAmount: parseFloat(totalAmount),
            transactionId: 'SKIP-PAYMENT-' + ticketNumber,
            ticketNumber,
            bookingDate: new Date()
        });

        // Save booking record with session
        await booking.save({ session });

        // Create ticket details for response
        const ticketDetails = {
            ticketNumber,
            movieName,
            theaterName,
            showDate,
            showTime,
            seats: selectedSeats,
            totalAmount,
            transactionId: 'SKIP-PAYMENT-' + ticketNumber,
            bookingDate: new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'short'
            }),
            paymentStatus: 'SKIPPED'
        };

        // Commit the transaction
        await session.commitTransaction();

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Ticket generated successfully (Payment Skipped)',
            ticketDetails
        });

    } catch (error) {
        // Abort transaction on error
        await session.abortTransaction();
        
        console.error('Ticket generation error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to generate ticket'
        });
    } finally {
        // End session
        session.endSession();
    }
});

// Get payment history with pagination
app.get('/payments', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const payments = await Payment.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Payment.countDocuments();

        res.json({
            success: true,
            data: payments,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                recordsPerPage: limit
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching payment records',
            error: error.message
        });
    }
});

// Get specific payment details
app.get('/payment/:ticketNumber', async (req, res) => {
    try {
        const payment = await Payment.findOne({ ticketNumber: req.params.ticketNumber });
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment record not found'
            });
        }

        // Get associated booking details
        const booking = await Booking.findOne({ ticketNumber: req.params.ticketNumber });

        res.json({
            success: true,
            data: {
                payment,
                booking
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching payment details',
            error: error.message
        });
    }
});

// Get booking confirmation
app.get('/booking-confirmation/:ticketNumber', async (req, res) => {
    try {
        const booking = await Booking.findOne({ ticketNumber: req.params.ticketNumber });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking details', error });
    }
});

// Serve HTML files
app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'payment.html'));
});

app.get('/booking-confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, 'booking-confirmation.html'));
});

// Start the server
const PORT = 5501;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the application at http://localhost:${PORT}`);
});
