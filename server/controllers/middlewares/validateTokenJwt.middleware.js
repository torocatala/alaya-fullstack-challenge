const jwt = require('jsonwebtoken');


/**
 * Validates JWT token
 * @param req
 * @param res
 */
validateTokenJwt = (req, res, next) => {
    // const token = req.cookies.token;
    const authorization = req.headers["authorization"];
    const token = authorization && authorization.split(" ")[1];
    
    //Auth required if token is missing (401) 
    if (!token) return res.status(401).json({success: false, msg: 'Unauthorized request.'});
    
    try{
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({success: false, msg: 'Unauthorized request.'});
    }
}

module.exports = {
    validateTokenJwt
};