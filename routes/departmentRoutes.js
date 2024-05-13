const { Router } = require('express')
const { addDepartment, getDepartmentById, getDepartments, updateDepartment, deleteDepartment } = require('../controllers/departmentController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const departmentRouter = Router()

departmentRouter.get("/", getDepartments)
departmentRouter.get("/:id?", getDepartmentById)
departmentRouter.put("/:id?", updateDepartment)
departmentRouter.post("/", addDepartment)
departmentRouter.delete("/:id?", isHr, deleteDepartment)

module.exports = { departmentRouter }