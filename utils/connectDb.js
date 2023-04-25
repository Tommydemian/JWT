const mongoose = require('mongoose');
require('dotenv').config();

function connectDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected successfully to MongoDB');
    })
    .catch((err) => {
        console.error('there was an error', err);
    })
};

module.exports = connectDb;
