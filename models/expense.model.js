const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    absenceId: {
        type: Schema.Types.ObjectId,
        ref: 'absenceModel',
        required: true,
    },
    expenseTitle: {
        type: String,
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
        type: Array,
        required: true,
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