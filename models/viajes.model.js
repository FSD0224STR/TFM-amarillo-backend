const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viajesSchema = new Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    tripDestination: {
        type: String,
        required: true,
    },
    tripPurpose: {
        type: String,
        required: true,
    },
    spends: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["Aprobado", "Rechazado", "Pendiente"],
    },
    removedAt: Date
    }, {timestamps: true});

const viajesModel = mongoose.model("viajesModel", viajesSchema);
    
module.exports = viajesModel