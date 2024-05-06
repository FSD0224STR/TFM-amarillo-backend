const { Router } = require('express')
const { getUsers, addUser, resetToDefault, updateUser, deleteUser, getMyProfile } = require('../controllers/userController')

const userRouter = Router()

userRouter.get("/", getUsers)
userRouter.post("/", addUser)
userRouter.get('/me', getMyProfile)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)


module.exports = { userRouter }