const User = require('../models/user');
const {} = require('../models/user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');


/**
 * User authentication
 * @param req
 * @param res
 * @returns response returned to it's origin
 */
authenticate = async (req, res) => {

	try {
		// Find user in DB and checks if it exist.
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(400).json({success: false, msg: 'Invalid credentials.'});
		} 

		// Validate that the password sent is the same as the one in the DB
		const validPassword = await bcryptjs.compare(req.body.password, user.password);
		if (!validPassword) {
			return res.status(400).json({success: false, msg: 'Invalid credentials. (password)'});
		}
		
		// Sign JWT token with email. 
		const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, { expiresIn: "1h" });

		return res.send({ success: true, msg: 'Use has logged in successfully.', user: {fullName: user.fullName, username: user.username, email: user.email, token: token}});
	}
	catch (error){
		return res.status(409).json({success: false, msg: 'There was an issue with your request.', err: error});
	}
};


module.exports = {
	authenticate
};