const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  profileType: {
      type: String,
      required: true
  },
  profilePic: {
      type: String,
      required: true
  },
  phoneExt: {
      type: String,
      required: true
  },
  dni: {
      type: String,
      required: true
  },
  position: {
      type: String,
      required: function() {
          return this.profileType !== "HR";
      }
  },
  departmentId: {
      type: Schema.Types.ObjectId,
      required: function() {
          return this.profileType !== "HR";
      }
  },
  bankAccount: {
      type: String,
      required: function() {
          return this.profileType !== "HR";
      }
  },
  fullName: {
      type: String,
      required: function() {
          return this.profileType !== "HR";
      }
  },
  studies: {
      type: String,
      required: function() {
          return this.profileType !== "HR";
      }
  },
  birthDate: {
      type: Date,
      required: function() {
          return this.profileType !== "HR";
      }
  },
  address: {
      type: String,
      required: function() {
          return this.profileType !== "HR";
      }
  },
  phoneNumber: {
      type: Number,
      required: function() {
          return this.profileType !== "HR";
      }
  },
  personalMail: {
      type: String,
      required: function() {
          return this.profileType !== "HR";
      }
  },
  status: {
      type: String,
      enum: ["Sick leave", "Working", "Former"],
      required: function() {
          return this.profileType !== "HR";
      }
  },
  removedAt: Date
});
  const userModel = mongoose.model("userModel", userSchema);
   
  module.exports = userModel