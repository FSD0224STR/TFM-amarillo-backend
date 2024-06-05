const { Router } = require('express')
const multer = require('multer')
const uploadRouter = Router()

const { uploadProfileImage, checkAUTHandUser } = require('../controllers/uploadController')
const upload = multer({dest: 'uploads/'})


uploadRouter.post("/",  upload.single("file"),  checkAUTHandUser, uploadProfileImage)


module.exports = { uploadRouter }