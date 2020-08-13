// Imports
const express = require('express');
// Import controllers
const {
	getBoocamps,
	getBootcamp,
	createBootcamp,
	updateBootcamp,
	deleteBootcamp
} = require('../controllers/bootcamps');
// Create router from express
const router = express.Router();
// Routes mapping
router.route('/').get(getBoocamps).post(createBootcamp);
router
	.route('/:id')
	.get(getBootcamp)
	.put(updateBootcamp)
	.delete(deleteBootcamp);
// Export module
module.exports = router;
