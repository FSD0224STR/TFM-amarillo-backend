const expenseModel = require('../models/expense.model')
const userModel = require('../models/user.model')
const transporter = require('../transporter')

const emailSent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Esto es una prueba de envío correo de confirmación de fecha de pago en gastos</h1>
</body>
</html>`

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
    console.log("Gastos obtenidos")
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
        console.log("Nuevos gasto: ", newExpense)
        res.status(201).json({msg: "Expense created", newExpense})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const updateExpense = async (req, res) => { 
    try {
        const data = await expenseModel.findByIdAndUpdate(req.params.id, {expenseStatus: "Aprobado", ...req.body}).populate({
            path: 'absenceId',
                populate: {
                    path: 'employeeId'
                }
        });
        const email = {
            from: "fsd24amarillo@gmail.com",
            to: data.absenceId.employeeId.email,
            subject: "Confirmación de fecha de pago",
            //text: "Hemos recibido tu gasto",
            html: emailSent
        };
        transporter.sendMail(email, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        })
        console.log("data: ", data)
        res.status(200).json({msg: "Expense updated and approved"})
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