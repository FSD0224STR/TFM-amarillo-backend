const { Router } = require('express')
const { addTask, getTaskById, getTasks, updateTask, deleteTask } = require('../controllers/taskController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const taskRouter = Router()

taskRouter.get("/", getTasks)
taskRouter.get("/:id?", getTaskById)
taskRouter.put("/:id?", updateTask)
taskRouter.post("/", addTask)
taskRouter.delete("/:id?", isHr, deleteTask)

module.exports = { taskRouter }