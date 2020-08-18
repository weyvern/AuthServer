// Imports
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
// Define config file
dotenv.config({ path: './config/config.env' });
// Connect to DB
connectDB();
// Define port
const port = process.env.PORT || 5000;
// Import routes
const auth = require('./routes/auth');
// Create app from expreess
const app = express();
// **** Middlewares ***
// Parse request body
app.use(express.json());
// Logger for dev mode
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
// Routes
app.use('/api/v1/auth', auth);
// Error handler
app.use(errorHandler);
// Listen
const server = app.listen(
	port,
	console.log(
		`Auth server started in ${process.env.NODE_ENV} mode on port ${port}`.yellow
			.bold
	)
);
// Handle uhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server
	server.close(() => process.exit(1));
});
