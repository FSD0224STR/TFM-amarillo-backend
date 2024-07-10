const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const absenceSchema = new Schema({
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
        required: true
    },
    city: {
        type: String,
        required: true
    },
    continent: {
        enum: ["America", "Europa", "Africa", "Asia", "Oceania"],
        type: String,
        required: true
    },
    absenceName: {
        type: String,
        required: true
    },
    absenceService: {
        enum: ["Demo", "Venta", "Post-venta", "Soporte", "Formacion", "Feria", "Otros"],
        type: String,
        required: true
    },
    absenceCode: {
        type: String,
    },
    removedAt: Date,
},
    { timestamps: true }
);

const absenceModel = mongoose.model("absenceModel", absenceSchema);

module.exports = absenceModel