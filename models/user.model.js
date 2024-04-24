const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
      type: String,
      required: true, 
      },
    name:{
      type: String,
      required: true
      },
    surname: {
      type: String,
      required: true
      },
    password:{
      type: String,
      required: true
      }   
  });
  
  const userModel = mongoose.model("userModel", userSchema);
   
  module.exports = userModel