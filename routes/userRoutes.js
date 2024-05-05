const { Router } = require('express')
const { addUser, resetToDefault, getUsers, checkUser } = require('../controllers/userController')

const userRouter = Router()

userRouter.get("/", getUsers)
userRouter.post("/create", addUser)
userRouter.post("/login", checkUser)

module.exports = { userRouter }