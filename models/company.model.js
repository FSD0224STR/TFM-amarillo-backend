const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    companyNIF: {
        type: String
    },
    companyAddress: {
        type: String
    },
    companyPostalCode: {
        type: Number
    },
    companyCity: {
        type: String
    },
    companyCountry: {
        type: String
    },
    companyPhone: {
        type: Number
    },
    companyPlan: {
        type: String,
        enum: ["Small", "Medium", "Large"],
    },
    companyLogo: {
        type: String,
    },
    removedAt: Date,
    },
    {timestamps: true}
);
const companyModel = mongoose.model("companyModel", companySchema);
    
module.exports = companyModel