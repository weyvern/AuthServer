// Imports
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Schema
const UserSchema = new mongoose.Schema({
	name: { type: String, required: [true, 'Name is required'] },
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		lowercase: true
	},
	password: { type: String, required: [true, 'Password is required'] }
});
// Model methods
// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	return next();
});
// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};
// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};
// Export module
module.exports = mongoose.model('User', UserSchema);
