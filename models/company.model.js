const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String
    },
    companyPhone: {
        type: String
    },
    removedAt: Date,
    },
    {timestamps: true}
);
const companyModel = mongoose.model("companyModel", companySchema);
    
module.exports = companyModel