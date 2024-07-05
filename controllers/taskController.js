const taskModel = require('../models/task.model')

const getTasks = async (req, res) => {
    const tasks = await taskModel.find({removedAt: {$eq: null}}).populate({
        path: "goalId",
            populate: [
                {path: "employeeId"},                
            ],
        })
        
    console.log("Tasks found")
    console.log(tasks)
    res.status(200).json(tasks)
}

const getTasksByUser = async (req, res) => {
    const employeeId = req.params.employeeId; // or req.query.employeeId if you are using query parameters

    try {
        const tasks = await taskModel.find({ removedAt: { $eq: null } })
            .populate({
                path: "goalId",
                populate: {
                    path: "employeeId",
                    match: { _id: employeeId } // filter based on employeeId
                }
            });

        const filteredTasks = tasks.filter(task => task.goalId.employeeId);

        console.log("Tasks found for employee:", employeeId);
        res.status(200).json(filteredTasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "An error occurred while fetching tasks" });
    }
};

const getTaskById = async (req, res) => {
    try {
        const data = await taskModel.findById(req.params.id);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({msg: "Task not found"})
    }
}

const addTask = async (req, res) => {
    try {
        const newTask = await taskModel.create({...req.body})
        console.log("New task: ", newTask)
        res.status(201).json({msg: "Task created", newTask})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const updateTask = async (req, res) => { 
    try {
        const task = await taskModel.findByIdAndUpdate(req.params.id, {...req.body})
        console.log(task)
        res.status(200).json({msg: "Task updated"})
    } catch (error) {
        res.status(404).json({msg: "Task not found"})
    }
}

const deleteTask = async (req, res) => {
    try {
        await taskModel.findByIdAndUpdate(req.params.id, {removedAt: new Date()})
        res.status(200).json({ msg: "Task removed successfully" })
    } catch (error) {
        res.status(404).json({msg: "Task not found"})
    }
}

module.exports = { 
    getTasks, 
    getTaskById, 
    addTask,
    updateTask,
    deleteTask,
    getTasksByUser
}  
