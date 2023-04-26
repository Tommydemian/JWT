const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel')
const tryCatch = require('../../utils/tryCatch')
const { createNewCustomAPIError } = require('../../errors/customAPIError')

const getCurrentUser = tryCatch( async(req, res, next) => {
    const {_id, name, email } = await User.findById(req.user.id) // set in the middleware.

    res.status(200).json({
        id: _id, 
        name: name,
        email: email
    })

 });

 module.exports = getCurrentUser