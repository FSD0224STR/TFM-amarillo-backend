const { Router } = require('express')
const { addExpense, getExpenseById, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const expenseRouter = Router()

expenseRouter.get("/", authenticatedToken, getExpenses)
expenseRouter.get("/:id?", authenticatedToken, getExpenseById)
expenseRouter.put("/:id?", authenticatedToken, updateExpense)
expenseRouter.post("/", authenticatedToken, addExpense)
expenseRouter.delete("/:id?", authenticatedToken, isHr, deleteExpense)

module.exports = { expenseRouter }