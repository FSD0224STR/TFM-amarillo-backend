const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const absenceSchema = new Schema({
    absenceType: {
        enum: ["Viaje de empresa", "Vacaciones", "Baja medica"],
        type: String,
        required: true
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
    removedAt: Date,
    },
    {timestamps: true}
);

const absenceModel = mongoose.model("absenceModel", absenceSchema);
    
module.exports = absenceModel