// Imports
const express = require('express');
const {
	validateBody,
	schemas: { authSchema, loginSchema }
} = require('../helpers/routes-helpers');
const passport = require('passport');
const passportConfig = require('../passport/passport-config');
// Passport strategies assignment
const passportJWT = passport.authenticate('jwt', { session: false });
const passportLocal = passport.authenticate('local', { session: false });
// Import controllers
const { signUp, signIn, secret } = require('../controllers/auth');
// Create router from express
const router = express.Router();
// Routes mapping
router.route('/signup').post(validateBody(authSchema), signUp);
router.route('/signin').post(validateBody(loginSchema), passportLocal, signIn);
router.route('/secret').get(passportJWT, secret);
// Export module
module.exports = router;
