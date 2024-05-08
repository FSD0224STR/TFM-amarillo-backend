const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    absenceType: {
        enum: ["Business Travel", "Vacation", "Sick Leave"],
        type: String,
        required: true
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    removedAt: Date,
    timestamps: true
    
});

const expenseModel = mongoose.model("expenseModel", expenseSchema);
    
module.exports = expenseModel