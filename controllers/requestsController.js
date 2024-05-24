const expenseModel = require('../models/expense.model');

const jwt = require('jsonwebtoken');

const myTokenSecret = process.env.MYTOKENSECRET;

const getRequests = async (req, res) => {
    const expenses = await expenseModel.find()
    const absence = await absenceModel.find()
    console.log("solicitudes recogidas")
    res.status(200).json(expenses, absence)
}

const getRequestsId = async (req, res) => {
    try {
        const expenses = await expenseModel.findById(req.params.id);
        const absence = await absenceModel.findById(req.params.id);
        res.status(200).json(expenses, absence)
    } catch (error) {
        res.status(404).json({msg: "Requests not found"})
    }
}

const updateRequests = async (req, res) => { 
    try {
        const expenses = await expenseModel.findByIdAndUpdate(req.params.id, {...req.body})
        const absence = await absenceModel.findByIdAndUpdate(req.params.id, {...req.body})
        res.status(200).json({msg: "Request updated"})
    } catch (error) {
        res.status(404).json({msg: "Request not found"})
    }
}

const deleteRequests = async (req, res) => {
    try {
        const expenses = await expenseModel.findByIdAndDelete(req.params.id)
        const absence = await absenceModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            msg: "Request removed successfully"
        })
    } catch (error) {
        res.status(404).json({msg: "Request not found"})
    }
}

module.exports = { 
    getRequests,
    getRequestsId,
    updateRequests,
    deleteRequests
}  