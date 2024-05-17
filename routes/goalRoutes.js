const { Router } = require('express')
const { addGoal, getGoalById, getGoals, updateGoal, deleteGoal } = require('../controllers/goalController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const goalRouter = Router()

goalRouter.get("/", authenticatedToken, getGoals)
goalRouter.get("/:id?", authenticatedToken, getGoalById)
goalRouter.put("/:id?", authenticatedToken, updateGoal)
goalRouter.post("/", authenticatedToken, addGoal)
goalRouter.delete("/:id?", authenticatedToken, isHr, deleteGoal)

module.exports = { goalRouter }