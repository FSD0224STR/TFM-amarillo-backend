const viajesModel = require('../models/viajes.model');
const jwt = require('jsonwebtoken');

const myTokenSecret = process.env.MYTOKENSECRET;

const getViajes = async (req, res) => {
    const viajes = await viajesModel.find()
    console.log("viajes recogidos")
    res.status(200).json(viajes)
}

const getViajeId = async (req, res) => {
    try {
        const data = await viajesModel.findById(req.params.id);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({msg: "Trip not found"})
    }
}

const addViajes = async (req, res) => {
    try {
        const newViaje = await viajesModel.create({...req.body, state: "Pendiente"})
        console.log("Viaje nuevo creado: ", newViaje)
        res.status(201).json({msg: "Trip created", newViaje})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const updateViaje = async (req, res) => { 
    try {
        const data = await viajesModel.findByIdAndUpdate(req.params.id, {...req.body})
        res.status(200).json({msg: "Trip updated"})
    } catch (error) {
        res.status(404).json({msg: "Trip not found"})
    }
}

const deleteViaje = async (req, res) => {
    try {
        const viajeDeleted = await viajesModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            msg: "Trip removed successfully", 
            employee: viajeDeleted.employeeId.name, 
            place: viajeDeleted.tripDestination,
            purpose: viajeDeleted.tripPurpose
        })
    } catch (error) {
        res.status(404).json({msg: "Trip not found"})
    }
}

// const authenticatedToken = (req, res, next) => { //middleware que verifica token activo
//     try {
//         const token = req.headers.authorization.split(' ')[1]; // nos quedamos con el token antes de Bearer
//         const decodedToken = jwt.verify(token, myTokenSecret)
//         req.user = decodedToken;
//         next()
//     } catch (error) {
//         res.status(403).json({msg: "You are not authenticated", error})
//     }
// }

// const isHr = (req, res, next) => { //middleware que verifica si el tipo de perfil es de RRHH
//     if (req.user.profileType === "HR") return next()
//     res.status(403).json({msg: "You are not allowed"})
// }

module.exports = { 
    getViajes,
    getViajeId,
    addViajes,
    updateViaje,
    deleteViaje,
}  