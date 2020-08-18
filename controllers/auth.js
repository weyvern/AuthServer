// Imports
const User = require('../models/User');
//  @desc   Sign up
//  @route  POST /api/v1/auth/signup
//  @access Public
exports.signUp = async (req, res, next) => {
	try {
		// Get request values after JOI validation
		const { name, lastName, email, password } = req.value.body;
		// Ensure uniqueness
		const foundUser = await User.findOne({ 'local.email': email });
		if (foundUser) {
			return res.status(401).json({ msg: 'User already exists' });
		}
		// Create new user
		const newUser = new User({
			method: 'local',
			name,
			lastName,
			local: {
				email,
				password
			}
		});
		await newUser.save();
		// Send token
		res.status(201).json({ token: newUser.getSignedJwtToken() });
	} catch (err) {
		next(err);
	}
};
//  @desc   Sign in
//  @route  POST /api/v1/auth/signin
//  @access Public
exports.signIn = async (req, res, next) => {
	try {
		res.status(200).send({ token: req.user.getSignedJwtToken() });
	} catch (err) {
		next(err);
	}
};
//  @desc   Get user
//  @route  GET /api/v1/auth/user
//  @access Private
exports.user = async (req, res, next) => {
	try {
		const { id, name, lastName, status } = req.user;
		res.status(200).send({ user: { id, name, lastName, status } });
	} catch (err) {
		next(err);
	}
};
// 	@desc	Set status
//	@router PATCH /api/v1/auth/set-status
//	@access Private
exports.setStatus = async (req, res, next) => {
	try {
		const { id: idRequest } = req.user;
		const { status: statusOld } = req.body;
		let user = await User.findOneAndUpdate(
			{ _id: idRequest },
			{ status: statusOld },
			{
				new: true,
				runValidators: true
			}
		);
		const { _id: id, name, lastName, status } = user;
		res.status(200).send({ user: { id, name, lastName, status } });
	} catch (err) {
		next(err);
	}
};
