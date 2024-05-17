const goalModel = require('../models/goal.model')

const getGoals = async (req, res) => {
    const goals = await goalModel.find({removedAt: {$eq: null}})
    console.log("Goals found")
    res.status(200).json(goals)
}

const getGoalById = async (req, res) => {
    try {
        const data = await goalModel.findById(req.params.id);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({msg: "Goal not found"})
    }
}

const addGoal = async (req, res) => {
    try {
        const newGoal = await goalModel.create({...req.body})
        console.log("New goal: ", newGoal)
        res.status(201).json({msg: "Goal created", newGoal})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const updateGoal = async (req, res) => { 
    try {
        await goalModel.findByIdAndUpdate(req.params.id, {...req.body})
        res.status(200).json({msg: "Goal updated"})
    } catch (error) {
        res.status(404).json({msg: "Goal not found"})
    }
}

const deleteGoal = async (req, res) => {
    try {
        await goalModel.findByIdAndUpdate(req.params.id, {removedAt: new Date()})
        res.status(200).json({ msg: "Goal removed successfully" })
    } catch (error) {
        res.status(404).json({msg: "Goal not found"})
    }
}

module.exports = { 
    getGoals, 
    getGoalById, 
    addGoal,
    updateGoal,
    deleteGoal
}  