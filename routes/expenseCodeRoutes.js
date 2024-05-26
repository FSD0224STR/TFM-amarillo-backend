const { Router } = require('express')
const { authenticatedToken, isHr } = require('../controllers/userController')
const { getExpenseCodes, updateExpenseCode, getExpenseCodeById, addExpenseCode, deleteExpenseCode } = require('../controllers/expenseCodeController')

const expenseCodeRouter = Router()

expenseCodeRouter.get("/", authenticatedToken, getExpenseCodes)
expenseCodeRouter.get("/:id?", authenticatedToken, getExpenseCodeById)
expenseCodeRouter.put("/:id?", authenticatedToken, updateExpenseCode)
expenseCodeRouter.post("/", authenticatedToken, addExpenseCode)
expenseCodeRouter.delete("/:id?", authenticatedToken, isHr, deleteExpenseCode)

module.exports = { expenseCodeRouter }