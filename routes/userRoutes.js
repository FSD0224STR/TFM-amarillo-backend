const { Router } = require('express')
const { addUser, resetToDefault, getUsers, checkUser, authenticatedToken, isHr, getUserId, updateUser, deleteUser, confirmUser } = require('../controllers/userController')

const userRouter = Router()

userRouter.get("/", authenticatedToken, getUsers)
userRouter.get("/:id?", authenticatedToken, getUserId)
userRouter.put("/:id?", authenticatedToken, updateUser)
userRouter.post("/create", authenticatedToken, isHr, addUser)
userRouter.post("/login", checkUser)
userRouter.delete("/:id?", authenticatedToken, isHr, deleteUser)
userRouter.patch('/confirm/:id', confirmUser)

module.exports = { userRouter }

//authenticatedToken, isHr