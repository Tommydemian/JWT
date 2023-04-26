const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel')
const tryCatch = require('../../utils/tryCatch')
const { createNewCustomAPIError } = require('../../errors/customAPIError')

const getCurrentUser = tryCatch( async(req, res, next) => {
    res.status(200).json({ message: 'get current user' })
 });

 module.exports = getCurrentUser