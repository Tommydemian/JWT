const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel')
const tryCatch = require('../../utils/tryCatch')
const { createNewCustomAPIError } = require('../../errors/customAPIError')
const generateJWT = require('../utils/generateJWT')

// REGISTER USER:
const registerUser = tryCatch( async(req, res, next) => {
    const {name, email, password} = req.body;
    // first check if all the fields were passed.
    console.log(req.body);
    if (!name || !email || !password) {
        return next(createNewCustomAPIError(400, 'one or more of the required fields is not completed'))  
    }
    // now check if user already registered
    const userExist = await User.findOne({ email: email })
    if (userExist) return next(createNewCustomAPIError(400, 'user already registered'))

    // hash password:
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user:
    const user = await User.create({ name, email, password:hashedPassword })

    if (user) {
        res.status(201).json({
            _id: user.id, 
            name: user.name,
            email: user.email,
            token: generateJWT(user._id) 
        })
    } else {
        return next(createNewCustomAPIError(400, 'invalid user data'))
    }
});

module.exports = registerUser;