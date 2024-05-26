const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    absenceId: {
        type: Schema.Types.ObjectId,
        ref: 'absenceModel',
        required: true,
    },
    expenseDate: {
        type: Date,
        required: true
    },
    paymentMethod: {
        enum: ["Personal", "Business Card"],
        type: String,
        required: true
    },
    creditCardEnd: {
        type: Number,
    },
    expenseCodeId: {
        type: Schema.Types.ObjectId,
        ref: 'expenseCodeModel',
        //required: true,
    },
    expenseStatus: {
        type: String,
        enum: ["Pendiente", "Aprobado"],
        required: true
    },
    expensePayment: {
        type: Date,
    },
    removedAt: Date,
    },
    {timestamps: true}
);

const expenseModel = mongoose.model("expenseModel", expenseSchema);
    
module.exports = expenseModel