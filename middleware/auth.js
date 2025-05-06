const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next){
    const authorizationHeader = req.header('authorization');

    if (!authorizationHeader){
        return res.status(401).json({message: 'no token authorization denied'});
    }

    try {
        let actualToken;
        if (authorizationHeader.startsWith('Bearer ')){
            actualToken = authorizationHeader.split (' ')[1]; // extract token part after bearer
    
        } else {
            return res.status(401).json({message: 'token format is invalid'});
        }
        // verify extracted token
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

        req.user = decoded.user; // attaches user id to req
        next();
    } catch (err) {
        
        console.error('token verification failed', err.message);
        res.status(401).json({message: 'token is not valid'});
    }
}