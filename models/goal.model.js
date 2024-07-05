const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'userModel',
        required: true,
    },
    goalName: {
        type: String,
        required: true
    },
    goalDescription: {
        type: String,
    },
    goalStatus: {
        type: String,
        enum: ["Pendiente", "En proceso", "Completado"],
        default: "Pendiente"
    },
    removedAt: Date,
    },
    {timestamps: true}
);
const goalModel = mongoose.model("goalModel", goalSchema);
    
module.exports = goalModel;
