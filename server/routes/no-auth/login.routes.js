const userController = require('../../controllers/user.controller.js');
const authController = require('../../controllers/auth.controller.js');

var loginRoutes = function(express){
	
	const router = express.Router();

	/**
	 * User registration route
	 * @route POST /api/users/add
	 */
	router.route('/users/add').post(userController.addUser);


	/**
	 * Login route
	 * @route POST /api/login
	 */
	router.route('/login').post(authController.authenticate);


    // TODO: Password resset, Emai/User validation..

    return router;
}

module.exports = loginRoutes;
