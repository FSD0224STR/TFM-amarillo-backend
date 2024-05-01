const { Router } = require('express')
const { getUser, addUser, resetToDefault } = require('../controllers/userController')

const userRouter = Router()

userRouter.get("/", getUser)
userRouter.post("/", addUser)


module.exports = { userRouter }