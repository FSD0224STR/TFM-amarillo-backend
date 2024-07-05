const { Router } = require('express')
const { addGoal, getGoalById, getGoals, updateGoal, deleteGoal, addGoalForDepartment } = require('../controllers/goalController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const goalRouter = Router()

goalRouter.get("/", authenticatedToken, getGoals)
goalRouter.get("/:id?", authenticatedToken, getGoalById)
goalRouter.put("/:id?", authenticatedToken, updateGoal)
goalRouter.post("/", authenticatedToken, addGoal)
goalRouter.delete("/:id?", authenticatedToken, isHr, deleteGoal)
goalRouter.post('/department', authenticatedToken, isHr, addGoalForDepartment);

module.exports = { goalRouter }