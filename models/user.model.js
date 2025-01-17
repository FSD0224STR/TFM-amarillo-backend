const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileType: {
        enum: ["HR", "Employee"],
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    },
    phoneExt: {
        type: String,
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    position: {
        type: String,
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'departmentModel',
        required: true,
    },
    bankAccount: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    studies: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    personalMail: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Baja medica", "Alta", "Baja"],
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'companyModel',
        required: true,
    },
    confirmed: { 
        type: Boolean, 
        default: false 
    },
    removedAt: Date
    }, {timestamps: true});

const userModel = mongoose.model("userModel", userSchema);
    
module.exports = userModel