const User = require('../models/user');
const jwt = require('jsonwebtoken');

/**
 * Creates a new user
 * @param req
 * @param res
 * @returns void
 */
addUser = async (req, res) => {
	const user = {
		fullName: req.body.fullName,
		username: req.body.username, 
		email: req.body.email, 
		password: req.body.password  
	};
	
	// Validation of empty fields
	if (!user.fullName || !user.username || !user.email || !user.password) {
		return res.status(400).send({success: false, msg: 'One or more fields are missing.'});
	}

	try {

		// Validation if user with this email is already in the database
		const emailExist = await User.findOne({'email':user.email})
		if (emailExist) {
			return res.status(409).json({success: false, msg: 'This email is already being used.'});
		}

		// Validation if user with this username is already in the database
		const usernameExist = await User.findOne({'username':user.username})
		if (usernameExist) {
			return res.status(409).json({success: false, msg: 'This username is already being used.'});
		}

		const newUser = new User(user);

		// Saves the user into the DB
		newUser.save((err, saved) => {

			// TODO: Email validation - Send email to validate their account, adding new field on users db 'status', etc...
			return res.send({ success: true, msg: 'User has been registered.'});
		});

	} 
	catch (error) {
		return res.status(500).send({success: false, msg: error});
	}
};


module.exports = {
	addUser
};