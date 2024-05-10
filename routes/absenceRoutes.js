const { Router } = require('express')
const { addAbsence, getAbsenceById, getAbsences, updateAbsence, deleteAbsence } = require('../controllers/absenceController')
const { authenticatedToken, isHr } = require('../controllers/userController')

const absenceRouter = Router()

absenceRouter.get("/", getAbsences)
absenceRouter.get("/:id?", getAbsenceById)
absenceRouter.put("/:id?", updateAbsence)
absenceRouter.post("/", addAbsence)
absenceRouter.delete("/:id?", isHr, deleteAbsence)

module.exports = { absenceRouter }