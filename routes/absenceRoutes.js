const { Router } = require('express')
const { addAbsence, getAbsenceById, getAbsences, updateAbsence, deleteAbsence } = require('../controllers/absenceController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const absenceRouter = Router()

absenceRouter.get("/", authenticatedToken, getAbsences)
absenceRouter.get("/:id?", authenticatedToken, getAbsenceById)
absenceRouter.put("/:id?", authenticatedToken, updateAbsence)
absenceRouter.post("/", authenticatedToken, addAbsence)
absenceRouter.delete("/:id?", authenticatedToken, isHr, deleteAbsence)

module.exports = { absenceRouter }