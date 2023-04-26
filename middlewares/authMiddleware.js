const jwt = require('jsonwebtoken');
const tryCatch = require('../utils/tryCatch');
const User = require('../models/userModel');
const { createNewCustomAPIError } = require('../errors/customAPIError')
require('dotenv').config();

const protect = tryCatch(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startswith('Bearer')) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from the Token
            req.user = await User.findById(decoded.id).select(--[password])
            // we can get the it because it's the payload we already passed to the jwt create function.

            next()
        } catch (error) {
            return next(createNewCustomAPIError(401, 'Not authorized'))
        }

        // IF NO TOKEN: 
        if (!token) {
            return next(createNewCustomAPIError(401, 'No token, not authorized'))
        }
    }
});

module.exports = protect;