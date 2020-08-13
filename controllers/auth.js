// Imports
const User = require('../models/User');
//  @desc   Sign up
//  @route  POST /api/v1/auth/signup
//  @access Public
exports.signUp = async (req, res, next) => {
	// Get request values after JOI validation
	const { name, email, password } = req.value.body;
	// Ensure uniqueness
	const foundUser = await User.findOne({ email });
	if (foundUser) {
		return res.status(401).json({ msg: 'User already exists' });
	}
	// Create new user
	const newUser = new User({ name, email, password });
	await newUser.save();
	// Send token
	res.status(201).json({ token: newUser.getSignedJwtToken() });
};
//  @desc   Sign in
//  @route  POST /api/v1/auth/signin
//  @access Public
exports.signIn = async (req, res, next) => {
	res.status(200).send({ token: req.user.getSignedJwtToken() });
};
//  @desc   Get user
//  @route  GET /api/v1/auth/secret
//  @access Private
exports.secret = async (req, res, next) => {
	const { id, name, email } = req.user;
	res.status(200).send({ user: { id, name, email } });
};
