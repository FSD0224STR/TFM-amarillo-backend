const expenseCodeModel = require('../models/expenseCode.model')

const getExpenseCodes = async (req, res) => {
    const ExpenseCodes = await expenseCodeModel.find({removedAt: {$eq: null}})
    res.status(200).json(ExpenseCodes)
}

const getExpenseCodeById = async (req, res) => {
    try {
        const data = await expenseCodeModel.findById(req.params.id);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({msg: "Expense code not found"})
    }
}

const addExpenseCode = async (req, res) => {
    try {
        const newExpenseCode = await expenseCodeModel.create({...req.body})
        res.status(201).json({msg: "Expense code created", newExpenseCode})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const updateExpenseCode = async (req, res) => { 
    try {
        await expenseCodeModel.findByIdAndUpdate(req.params.id, {...req.body})
        res.status(200).json({msg: "Expense code updated"})
    } catch (error) {
        res.status(404).json({msg: "Expense code not found"})
    }
}

const deleteExpenseCode = async (req, res) => {
    try {
        await expenseCodeModel.findByIdAndUpdate(req.params.id, {removedAt: new Date()})
        res.status(200).json({ msg: "Expense code removed successfully" })
    } catch (error) {
        res.status(404).json({msg: "User not found"})
    }
}

module.exports = { 
    getExpenseCodes,
    getExpenseCodeById,
    addExpenseCode,
    updateExpenseCode,
    deleteExpenseCode
}  