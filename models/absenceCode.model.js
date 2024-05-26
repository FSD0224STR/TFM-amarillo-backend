const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const absenceCodeSchema = new Schema({
    absenceName: {
        type: String,
        required: true
    },
    absenceService: {
        enum: ["Demo", "Venta", "Post-venta", "Soporte", "Formacion", "Feria", "Otros"],
        type: String,
    },
    absenceCode: {
        type: String,
    },
    removedAt: Date,
    },
    {timestamps: true}
);

const absenceCodeModel = mongoose.model("absenceCodeModel", absenceCodeSchema);
    
module.exports = absenceCodeModel