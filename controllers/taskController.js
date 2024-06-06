const taskModel = require('../models/task.model')

const getTasks = async (req, res) => {
    const tasks = await taskModel.find({removedAt: {$eq: null}}).populate({
        path: "goalId",
            populate: [
                {path: "employeeId"},                
            ],
        })
        
    console.log("Tasks found")
    res.status(200).json(tasks)
}

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
        await taskModel.findByIdAndUpdate(req.params.id, {...req.body})
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
    deleteTask
}  
