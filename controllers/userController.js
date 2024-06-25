const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const transporter = require('../transporter')
const loginEmail = require('../emails/loginEmail')

const myTokenSecret = process.env.MYTOKENSECRET


const getUsers = async (req, res) => {
    try {
      const users = await userModel.find({ removedAt: { $eq: null } }).populate([
        { path: "departmentId", select: '_id departmentName'},
        { path: "companyId", select: '_id companyName' }
      ])
      const sanitizedUsers = users.map(user => {
        const userObject = user.toObject()
        delete userObject.password
        return userObject
      })
      res.status(200).json(sanitizedUsers)
    } catch (error) {
      console.error("Error al obtener los usuarios:", error)
      res.status(500).json({ message: "Error al obtener los usuarios" })
    }
}

const getUserId = async (req, res) => {
    try {
        const data = await userModel.findById(req.params.id).populate([
            { path: "departmentId", select: '_id departmentName'},
            { path: "companyId", select: '_id companyName' }
        ])
            if (data) {
            const userData = data.toJSON()
            delete userData.password
            res.status(200).json(userData)
            } else {
                res.status(404).json({msg: "User not foud"})
            }
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const addUser = async (req, res) => {
    try {
      const { email } = req.body;
      const userChecked = await userModel.findOne({ email });
  
      if (userChecked && userChecked.removedAt) {
        const updatedData = { ...req.body, removedAt: null };
        if (req.body.password) {
          updatedData.password = await bcrypt.hash(req.body.password, 10);
        }
        const restoredUser = await userModel.findByIdAndUpdate(userChecked._id, updatedData, { new: true });
  
        const email = {
          from: 'fsd24amarillo@gmail.com',
          to: restoredUser.email,
          subject: "Bienvenido de nuevo a BudgetWise",
          html: loginEmail,
        };
        transporter.sendMail(email, function (error, info) {
          if (error) {
            console.log('Email error ' + error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
  
        res.status(200).json({ msg: "User restored and updated", restoredUser });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await userModel.create({ ...req.body, password: hashedPassword });
 
        const email = {
          from: 'fsd24amarillo@gmail.com',
          to: newUser.email,
          subject: "Bienvenido de nuevo a BudgetWise",
          html: loginEmail,
        };
        transporter.sendMail(email, function (error, info) {
          if (error) {
            console.log('Email error ' + error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
  
        res.status(201).json({ msg: "User created", newUser });
      }
    } catch (error) {
      res.status(400).json({ msg: "You missed some parameter", error: error.message });
    }
  };
  
  module.exports = addUser;
  

const checkUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const userChecked = await userModel.findOne({email: email}) //verificamos si el email existe en nuestra BD
        if (!userChecked) return res.status(404).json({msg: "No estas registrado con este correo"})
        if(userChecked.removedAt) return res.status(404).json({msg: "Tu correo ya no esta activo."})
        const passwordChecked = await bcrypt.compare(req.body.password, userChecked.password) // si existe email, verificamos si la contraseña es correcta
        if (passwordChecked) { //generamos token de ingreso
            const token = jwt.sign({
                id: userChecked._id, 
                name: userChecked.name, 
                surname: userChecked.surname, 
                profileType: userChecked.profileType,
                email: userChecked.email
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
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const data = await userModel.findByIdAndUpdate(req.params.id, {...req.body,  password: hashedPassword})
            res.status(200).json({msg: "User updated"})
        }
        else{
            const data = await userModel.findByIdAndUpdate(req.params.id, {...req.body})
            res.status(200).json({msg: "User updated"})
        }
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