const expenseModel = require('../models/expense.model')

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "fsd24amarillo@gmail.com",
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

const getExpenses = async (req, res) => {
    const expenses = await expenseModel.find().populate({
        path: "absenceId",
            populate: [
                {path: "employeeId",
                    populate: 
                        {path: "departmentId",}}, 
                {path: "absenceCodeId",}
            ],
    })
    console.log("Ausencias encontradas")
    res.status(200).json(expenses)
}

const getExpenseById = async (req, res) => {
    try {
        const data = await expenseModel.findById(req.params.id);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({msg: "Expense not found"})
    }
}

const addExpense = async (req, res) => {
    try {
        const newExpense = await expenseModel.create({...req.body})
        console.log("Nueva ausencia: ", newExpense)
        res.status(201).json({msg: "Expense created", newExpense})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const updateExpense = async (req, res) => { 
    try {
        await expenseModel.findByIdAndUpdate(req.params.id, {expenseStatus: "Aprobado", ...req.body})
        res.status(200).json({msg: "Expense updated"})
    } catch (error) {
        res.status(404).json({msg: "Expense not found"})
    }
}

const deleteExpense = async (req, res) => {
    try {
        await expenseModel.findByIdAndUpdate(req.params.id, {removedAt: new Date()})
        res.status(200).json({ msg: "Expense removed successfully" })
    } catch (error) {
        res.status(404).json({msg: "Expense not found"})
    }
}

module.exports = { 
    getExpenses, 
    getExpenseById, 
    addExpense,
    updateExpense,
    deleteExpense
}  