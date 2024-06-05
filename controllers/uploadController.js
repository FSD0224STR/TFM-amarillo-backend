const cloudinary = require('cloudinary')
const jwt = require('jsonwebtoken');
const fs = require('fs');

const myTokenSecret = process.env.MYTOKENSECRET;

const userModel = require('../models/user.model')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })


const uploadProfileImage = async (req, res, user) => {
    if(!req.file) {
        return res.status(400).send("There are no files attached")
    }
    cloudinary.uploader.upload(req.file.path, async (result, error) => {
        try {
            if (error) {
                fs.unlinkSync(req.file.path)
                return res.status(500).send(error)
            }
            const urlToUpdate = { profilePic: result.url }
            const data = await userModel.findByIdAndUpdate(req.user.id, {...urlToUpdate})
            if (!data) {
                fs.unlinkSync(req.file.path)
                return res.status(404).json({ msg: "User not found" });
            }
            fs.unlinkSync(req.file.path)
            res.status(200).json({msg: "User updated", url: result.url})
        } catch(error) {
            fs.unlinkSync(req.file.path)
            res.status(500).json({ msg: "Error uploading or updating profile image", error: error.message })
        }
    }
)}
    

const checkAUTHandUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, myTokenSecret)
        req.user = decodedToken;
        next()
    } catch (error) {
        res.status(403).json({msg: "You are not authenticated", error})
    }
}

module.exports = { 
    uploadProfileImage,
    checkAUTHandUser
} 