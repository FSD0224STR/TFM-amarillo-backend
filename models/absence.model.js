const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const absenceSchema = new Schema({
    absenceCodeId: {
        type: Schema.Types.ObjectId,
        ref: 'absenceCodeModel',
        required: true,
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'userModel',
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
    continent: {
        enum: ["America", "Europa", "Africa", "Asia", "Oceania"],
        type: String,
    },
    removedAt: Date,
},
    { timestamps: true }
);

const absenceModel = mongoose.model("absenceModel", absenceSchema);

module.exports = absenceModel