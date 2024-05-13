const { Router } = require('express')
const { addCompany, getCompanyById, getCompanies, updateCompany, deleteCompany } = require('../controllers/companyController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const companyRouter = Router()

companyRouter.get("/", getCompanies)
companyRouter.get("/:id?", getCompanyById)
companyRouter.put("/:id?", updateCompany)
companyRouter.post("/", addCompany)
companyRouter.delete("/:id?", isHr, deleteCompany)

module.exports = { companyRouter }