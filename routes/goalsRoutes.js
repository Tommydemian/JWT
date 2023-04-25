const express = require('express');
const router = express.Router();

const { createOne, getOne, getAllGoals } = require('../controllers/goalController')

router.route('/')
.get(getAllGoals)
.post(createOne)

router.route('/:id')
.get(getOne)

module.exports = router;
