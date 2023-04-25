const mongoose = require('mongoose');
const Goal = require('../models/goalModel')
const jsonGoals = require('../goals.json')

require('dotenv').config()

async function populateDb(){
    try {
        // connect to database
        mongoose.connect(process.env.MONGO_URI)
        .then('connected from dummie data')
        .catch('wrong intent from dummie data')

        // collections dropped
        Goal.deleteMany({})

        // populate db with json goals
        for (goal of jsonGoals) {
            const newGoal = await Goal.create(goal)
        }
        console.log('data loaded successfully');

        mongoose.disconnect()
        .then('disconnected from dummie data')
        .catch('wrong intent to disconnect from dummie data')
    } catch (error) {
        console.error('database population error:', error);
        
    }
}

populateDb()
