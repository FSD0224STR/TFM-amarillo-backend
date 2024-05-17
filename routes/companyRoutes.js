const { Router } = require('express')
const { addCompany, getCompanyById, getCompanies, updateCompany, deleteCompany } = require('../controllers/companyController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const companyRouter = Router()

companyRouter.get("/", authenticatedToken, getCompanies)
companyRouter.get("/:id?", authenticatedToken, getCompanyById)
companyRouter.put("/:id?", authenticatedToken, updateCompany)
companyRouter.post("/", authenticatedToken, addCompany)
companyRouter.delete("/:id?", authenticatedToken, isHr, deleteCompany)

module.exports = { companyRouter }