const { Router } = require('express')
const { addTask, getTaskById, getTasks, updateTask, deleteTask } = require('../controllers/taskController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const taskRouter = Router()

taskRouter.get("/", authenticatedToken, getTasks)
taskRouter.get("/:id?", authenticatedToken, getTaskById)
taskRouter.put("/:id?", authenticatedToken, updateTask)
taskRouter.post("/", authenticatedToken, addTask)
taskRouter.delete("/:id?", authenticatedToken, isHr, deleteTask)

module.exports = { taskRouter }