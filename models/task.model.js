const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    goalId: {
        type: Schema.Types.ObjectId,
        ref: 'goalModel',
        required: true,
    },
    taskStatus: {
        enum: ["Pendiente", "En proceso", "Completado"],
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
    },
    removedAt: Date,
    },
    {timestamps: true}
);

const taskModel = mongoose.model("taskModel", taskSchema);
    
module.exports = taskModel