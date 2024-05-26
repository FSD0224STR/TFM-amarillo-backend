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
    expenseType: {
        enum: ["Traslados", "Dietas", "Hospedajes"],
        type: String,
        required: true
    },
    expenseEuros: {
        type: Number,
        required: true
    },
    expenseStatus: {
        type: String,
        enum: ["Pendiente", "Aprobada"],
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