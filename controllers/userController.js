const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
const User = require('../models/userModel')
const tryCatch = require('../utils/tryCatch')
const { createNewCustomAPIError } = require('../errors/customAPIError')

const registerUser = tryCatch( async(req, res, next) => {
    const {name, email, password} = req.body;
    // first check if all the fields were passed.
    if (!name || !email || !password) {
        return next(createNewCustomAPIError(400, 'one or more of the required fields is not completed'))  
    }
    // now check if user already registered
    const userExist = await User.findOne({ email: email })
    if (userExist) return next(createNewCustomAPIError(400, 'user already registered'))

    // hash password:
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // create user:
    const user = await User.create({ name, email, password:hashPassword })

    if (user) {
        res.status(201).json({
            _id: user.id, 
            name: user.name,
            email: user.email,
            jwt: generateJWT(user._id) 
        })
    } else {
        return next(createNewCustomAPIError(400, 'invalid user data'))
    }
});

const loginUser = tryCatch( async(req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id, 
            name: user.name,
            email: user.email
        })
    } else {
        return next(createNewCustomAPIError(400, 'invalid credentials'))
    }

   res.status(200).json({ message: 'Login' })
});

const getCurrentUser = tryCatch( async(req, res, next) => {
   res.status(200).json({ message: 'get current user' })
});

const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = { registerUser, loginUser, getCurrentUser }