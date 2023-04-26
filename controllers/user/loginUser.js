const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel')
const tryCatch = require('../../utils/tryCatch')
const { createNewCustomAPIError } = require('../../errors/customAPIError')

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

module.exports = loginUser;