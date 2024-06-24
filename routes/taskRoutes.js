const { Router } = require('express')
const { addTask, getTaskById, getTasks, updateTask, deleteTask, getTasksByUser } = require('../controllers/taskController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const taskRouter = Router()

taskRouter.get("/", authenticatedToken, getTasks)
taskRouter.get("/:id?", authenticatedToken, getTaskById)
taskRouter.put("/:id?", authenticatedToken, updateTask)
taskRouter.post("/", authenticatedToken, addTask)
taskRouter.delete("/:id?", authenticatedToken, isHr, deleteTask)
taskRouter.get("/user/:employeeId", authenticatedToken, getTasksByUser)

module.exports = { taskRouter }