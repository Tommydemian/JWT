const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // _id
    required: true, 
    ref: 'User', // name of the model => complete the reference. 
  },
  name: {
    type: String, 
    required: [true, 'name must be provided'], 
    minLength: 7, 
  }, 
  completed:{
    type: Boolean,
    default: false
  }
},
{ timestamps:  true }
);

module.exports = mongoose.model('Goal', goalSchema);