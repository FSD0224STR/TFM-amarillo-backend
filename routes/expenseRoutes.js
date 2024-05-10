const { Router } = require('express')
const { addExpense, getExpenseById, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const expenseRouter = Router()

expenseRouter.get("/", getExpenses)
expenseRouter.get("/:id?", getExpenseById)
expenseRouter.put("/:id?", updateExpense)
expenseRouter.post("/", addExpense)
expenseRouter.delete("/:id?", authenticatedToken, isHr, deleteExpense)

module.exports = { expenseRouter }