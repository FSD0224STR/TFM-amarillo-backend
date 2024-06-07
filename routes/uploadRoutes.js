const { Router } = require('express')
const multer = require('multer')
const uploadRouter = Router()

const { uploadProfileImage, uploadCompanyLogo } = require('../controllers/uploadController')
const { authenticatedToken, isHr } = require('../controllers/userController')
const upload = multer({dest: 'uploads/'})


uploadRouter.post("/user",  upload.single("file"),  authenticatedToken, uploadProfileImage)
uploadRouter.post("/company/:id?",  upload.single("file"),  authenticatedToken, isHr, uploadCompanyLogo)

module.exports = { uploadRouter }