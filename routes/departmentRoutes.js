const { Router } = require('express')
const { addDepartment, getDepartmentById, getDepartments, updateDepartment, deleteDepartment } = require('../controllers/departmentController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const departmentRouter = Router()

departmentRouter.get("/", authenticatedToken, getDepartments)
departmentRouter.get("/:id?", authenticatedToken, getDepartmentById)
departmentRouter.put("/:id?", authenticatedToken, updateDepartment)
departmentRouter.post("/", authenticatedToken, isHr, addDepartment)
departmentRouter.delete("/:id?", authenticatedToken, isHr, deleteDepartment)

module.exports = { departmentRouter }