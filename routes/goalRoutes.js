const { Router } = require('express')
const { addGoal, getGoalById, getGoals, updateGoal, deleteGoal } = require('../controllers/goalController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const goalRouter = Router()

goalRouter.get("/", getGoals)
goalRouter.get("/:id?", getGoalById)
goalRouter.put("/:id?", updateGoal)
goalRouter.post("/", addGoal)
goalRouter.delete("/:id?", isHr, deleteGoal)

module.exports = { goalRouter }