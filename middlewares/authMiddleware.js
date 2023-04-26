const jwt = require('jsonwebtoken');
const tryCatch = require('../utils/tryCatch');
const User = require('../models/userModel');
const { createNewCustomAPIError } = require('../errors/customAPIError')

const protect = tryCatch(async (req, res, next) => {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header
            console.log(req.headers.authorization);
            token = req.headers.authorization.split(' ')[1]
            console.log('token   ' + token + ' ');
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get user from the Token
            req.user = await User.findById(decoded.id).select('-password')
            // we can get the it because it's the payload we already passed to the jwt create function.
            next()
        } catch (error) {
            // return next(createNewCustomAPIError(401, 'Not authorized'))
            return res.status(401).json({ message: 'Not authorized' })
        }
    }
    // IF NO TOKEN: 
    if (!token) {
        // return next(createNewCustomAPIError(401, 'No token, not authorized'))
        return res.status(401).json({ message: 'No token, Not authorized' })
    }
});

module.exports = protect;