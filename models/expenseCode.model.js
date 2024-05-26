const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseCodeSchema = new Schema({
    expenseType: {
        enum: ["Traslados", "Dietas", "Hospedajes"],
        type: String,
        required: true
    },
    expenseEuros: {
        type: Number,
        required: true
    },
    removedAt: Date,
    },
    {timestamps: true}
);

const expenseCodeModel = mongoose.model("expenseCodeModel", expenseCodeSchema);
    
module.exports = expenseCodeModel