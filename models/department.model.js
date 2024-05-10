const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    departmentName: {
        type: String,
        required: true
    },
    removedAt: Date,
    },
    {timestamps: true}
);
const departmentModel = mongoose.model("departmentModel", departmentSchema);
    
module.exports = departmentModel