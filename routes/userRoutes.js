const { Router } = require('express')
const { getUser, addUser, resetToDefault } = require('../controllers/userController')

const userRouter = Router()

userRouter.get("/", getUser)
userRouter.post("/", addUser)

// Para tener la base de datos siempre con los mismos datos y poder hacer test de eliminar
userRouter.get("/resetToDefault", resetToDefault)

module.exports = { userRouter }