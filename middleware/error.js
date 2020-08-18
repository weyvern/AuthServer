// Error handler
const errorHandler = (err, req, res, next) => {
	if ((process.env.NODE_ENV = 'development')) {
		console.log(err.stack.red);
	}
	return res.status(500).json({ error: err.message });
};
// Export module
module.exports = errorHandler;
