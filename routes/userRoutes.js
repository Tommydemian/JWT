const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/user');


router.route('/')
.post(registerUser)

router.route('/login')
.post(loginUser)

// get the current id from the current logged in user
router.route('/me')
.get(getCurrentUser)



module.exports = router
