const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const myTokenSecret = process.env.MYTOKENSECRET;

const getUsers = async (req, res) => {
    const users = await userModel.find()
    console.log("usuarios recogidos")
    res.status(200).json(users)
}

const addUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10) // encryptamos contraseña creada
    console.log("hashedPassword: ", hashedPassword)
    try {
        const newUser = await userModel.create({...req.body, password: hashedPassword})
        console.log("usuario nuevo: ", newUser)
        res.status(201).json({msg: "User created", newUser})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const checkUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const userChecked = await userModel.findOne({email: email}) //verificamos si el email existe en nuestra BD
        if (!userChecked) return res.status(404).json({msg: "Email not found"})
        const passwordChecked = await bcrypt.compare(req.body.password, userChecked.password) // si existe email, verificamos si la contraseña es correcta
        if (passwordChecked) { //generamos token de ingreso
            const token = jwt.sign({
                id: userChecked._id, 
                name: userChecked.name, 
                surname: userChecked.surname, 
                profileType: userChecked.profileType
            }, myTokenSecret) 
            console.log("token: ", token)
            return res.status(200).json({msg: 'Successful authentication', token: token})}
        return res.status(404).json({msg: "Not logged in. Please, check your password"})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

module.exports = { getUsers, addUser, checkUser }  