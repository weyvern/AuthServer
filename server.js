// Imports
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
// Define config file
dotenv.config({ path: './config/config.env' });
// Connect to DB
connectDB();
// Define port
const port = process.env.PORT || 5000;
// Import routes
const auth = require('./routes/auth');
const bootcamps = require('./routes/bootcamps');
// Create app from expreess
const app = express();
// Middlewares
// Parse request body
app.use(express.json());
// Logger for dev mode
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
// Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/bootcamps', bootcamps);
// Listen
const server = app.listen(
	port,
	console.log(
		`Server started in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
	)
);
// Handle uhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server
	server.close(() => process.exit(1));
});
