const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const myTokenSecret = process.env.MYTOKENSECRET;

const getUsers = async (req, res) => {
    const users = await userModel.find({removedAt: {$eq: null}}).populate({
        path: "departmentId"})
    console.log("usuarios recogidos")
    res.status(200).json(users)
}

const getUserId = async (req, res) => {
    try {
        const data = await userModel.findById(req.params.id);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({msg: "User not found"})
    }
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
        if (!userChecked) return res.status(404).json({msg: "No estas registrado con este correo"})
        const passwordChecked = await bcrypt.compare(req.body.password, userChecked.password) // si existe email, verificamos si la contraseña es correcta
        if (passwordChecked) { //generamos token de ingreso
            const token = jwt.sign({
                id: userChecked._id, 
                name: userChecked.name, 
                surname: userChecked.surname, 
                profileType: userChecked.profileType
            }, myTokenSecret, {expiresIn: '1h'}) 
            console.log("token: ", token)
            return res.status(200).json(token)}
        return res.status(404).json({msg: "Contraseña incorrecta"})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const authenticatedToken = (req, res, next) => { //middleware que verifica token activo
    try {
        const token = req.headers.authorization.split(' ')[1]; // nos quedamos con el token antes de Bearer
        const decodedToken = jwt.verify(token, myTokenSecret)
        req.user = decodedToken;
        next()
    } catch (error) {
        res.status(403).json({msg: "You are not authenticated", error})
    }
}

const isHr = (req, res, next) => { //middleware que verifica si el tipo de perfil es de RRHH
    if (req.user.profileType === "HR") return next()
    res.status(403).json({msg: "You are not allowed"})
}

const updateUser = async (req, res) => { 
    try {
        const data = await userModel.findByIdAndUpdate(req.params.id, {...req.body})
        res.status(200).json({msg: "User updated"})
    } catch (error) {
        res.status(404).json({msg: "User not found"})
    }
}

const deleteUser = async (req, res) => {
    try {
        const userDeleted = await userModel.findByIdAndUpdate(req.params.id, {removedAt: new Date()})
        res.status(200).json({
            msg: "User removed successfully", 
            name: userDeleted.name, 
            surname: userDeleted.surname
        })
    } catch (error) {
        res.status(404).json({msg: "User not found"})
    }
}

module.exports = { 
    getUsers, 
    addUser, 
    checkUser,
    authenticatedToken,
    isHr,
    getUserId,
    updateUser,
    deleteUser
}  