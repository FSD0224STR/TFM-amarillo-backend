const absenceModel = require('../models/absence.model')

const getAbsences = async (req, res) => {
    const absences = await absenceModel.find()
    console.log("Ausencias encontradas")
    res.status(200).json(absences)
}

const getAbsenceById = async (req, res) => {
    try {
        const data = await absenceModel.findById(req.params.id);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({msg: "Absence not found"})
    }
}

const addAbsence = async (req, res) => {
    try {
        const newAbsence = await absenceModel.create({...req.body})
        console.log("Nueva ausencia: ", newAbsence)
        res.status(201).json({msg: "Absence created", newAbsence})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const updateAbsence = async (req, res) => { 
    try {
        await absenceModel.findByIdAndUpdate(req.params.id, {...req.body})
        res.status(200).json({msg: "Absence updated"})
    } catch (error) {
        res.status(404).json({msg: "Absence not found"})
    }
}

const deleteAbsence = async (req, res) => {
    try {
        await absenceModel.findByIdAndUpdate(req.params.id, {deletedAt: new Date()})
        res.status(200).json({ msg: "Absence removed successfully" })
    } catch (error) {
        res.status(404).json({msg: "User not found"})
    }
}

module.exports = { 
    getAbsences, 
    getAbsenceById, 
    addAbsence,
    updateAbsence,
    deleteAbsence
}  