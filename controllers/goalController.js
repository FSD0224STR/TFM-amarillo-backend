const goalModel = require('../models/goal.model')
const departmentModel = require('../models/department.model')
const userModel = require('../models/user.model')

const getGoals = async (req, res) => {
    const goals = await goalModel.find({removedAt: {$eq: null}}).populate({
        path: "employeeId"})
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
    console.log(req.body);
    try {
        const goal = await goalModel.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({msg: "Goal not found"});
        }

        await goalModel.updateMany({ goalName: goal.goalName }, { ...req.body });

        res.status(200).json({msg: "Goals updated"});
    } catch (error) {
        res.status(500).json({msg: "An error occurred"});
    }
};

const deleteGoal = async (req, res) => {
    try {
        await goalModel.findByIdAndUpdate(req.params.id, {removedAt: new Date()})
        res.status(200).json({ msg: "Goal removed successfully" })
    } catch (error) {
        res.status(404).json({msg: "Goal not found"})
    }
}

const addGoalForDepartment = async (req, res) => {
    const { departmentId, goalName, goalDescription } = req.body;

    try {
        const department = await departmentModel.findById(departmentId);
        if (!department) {
            return res.status(404).json({ msg: "Department not found" });
        }

        const users = await userModel.find({ departmentId: departmentId, removedAt: { $eq: null } });
        if (users.length === 0) {
            return res.status(404).json({ msg: "No users found in the department" });
        }

        const goals = await Promise.all(users.map(user => 
            goalModel.create({ 
                employeeId: user._id, 
                goalName, 
                goalDescription 
            })
        ));

        res.status(201).json({ msg: "Goals created for all department members", goals });
    } catch (error) {
        res.status(400).json({ msg: "Error creating goals", error: error.message });
    }
};

module.exports = { 
    getGoals, 
    getGoalById, 
    addGoal,
    updateGoal,
    deleteGoal,
    addGoalForDepartment
}  