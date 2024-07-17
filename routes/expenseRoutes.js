const { Router } = require('express')
const { addExpense, getExpenseById, getExpenses, updateExpense, deleteExpense, emailExpense, emailExpenseApproved } = require('../controllers/expenseController')
const { authenticatedToken, isHr } = require('../controllers/userController')
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const expenseRouter = Router()

expenseRouter.get("/", authenticatedToken, getExpenses)
expenseRouter.get("/:id?", authenticatedToken, getExpenseById)
expenseRouter.put("/:id?", authenticatedToken, updateExpense)
expenseRouter.put("/:id?/sending", authenticatedToken, emailExpense)
expenseRouter.put("/:id?/approving", authenticatedToken, emailExpenseApproved)
expenseRouter.post("/", authenticatedToken, addExpense)
expenseRouter.delete("/:id?", authenticatedToken, deleteExpense)

module.exports = { expenseRouter }

//upload.single("file")