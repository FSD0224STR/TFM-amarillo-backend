const departmentModel = require('../models/department.model')

const getDepartments = async (req, res) => {
    const departments = await departmentModel.find()
    console.log("Departments found")
    res.status(200).json(departments)
}

const getDepartmentById = async (req, res) => {
    try {
        const data = await departmentModel.findById(req.params.id);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({msg: "Department not found"})
    }
}

const addDepartment = async (req, res) => {
    try {
        const newDepartment = await departmentModel.create({...req.body})
        console.log("New department: ", newDepartment)
        res.status(201).json({msg: "Department created", newDepartment})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const updateDepartment = async (req, res) => { 
    try {
        await departmentModel.findByIdAndUpdate(req.params.id, {...req.body})
        res.status(200).json({msg: "Department updated"})
    } catch (error) {
        res.status(404).json({msg: "Department not found"})
    }
}

const deleteDepartment = async (req, res) => {
    try {
        await departmentModel.findByIdAndUpdate(req.params.id, {deletedAt: new Date()})
        res.status(200).json({ msg: "Department removed successfully" })
    } catch (error) {
        res.status(404).json({msg: "Department not found"})
    }
}

module.exports = { 
    getDepartments, 
    getDepartmentById, 
    addDepartment,
    updateDepartment,
    deleteDepartment
}  
