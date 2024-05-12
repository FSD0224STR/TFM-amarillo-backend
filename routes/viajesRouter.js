const { Router } = require('express')
const { getViajes, getViajeId, updateViaje, addViajes, deleteViaje } = require('../controllers/viajesController')
//const { authenticatedToken, isHr } = require('../controllers/userController')

const viajesRouter = Router()

viajesRouter.get("/", getViajes)
viajesRouter.get("/:id?", getViajeId)
viajesRouter.put("/:id?", updateViaje)
viajesRouter.post("/create", addViajes)
viajesRouter.delete("/:id?", deleteViaje)

module.exports = { viajesRouter }