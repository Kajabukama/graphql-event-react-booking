const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
   firstname: {
      type: String,
      required: true
   },
   lastname: {
      type: String,
      required: true,
   },
   mobile: {
      type: Number,
      required: true
   },
   username: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   role:{
      type: Number,
      required: true,
      default: 1
   },
   status:{
      type: Boolean,
      required: true,
      default: false
   },
   created_on:{
      type: Date,
      required: true,
      default: Date.now
   },
   createdEvents:[
      {
         type: Schema.Types.ObjectId,
         ref: 'Event'
      }
   ]
})

module.exports = mongoose.model('User', userSchema);