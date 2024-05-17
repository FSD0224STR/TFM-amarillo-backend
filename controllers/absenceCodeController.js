const absenceCodeModel = require('../models/absenceCode.model')

const getAbsenceCodes = async (req, res) => {
    const absenceCodes = await absenceCodeModel.find({removedAt: {$eq: null}})
    res.status(200).json(absenceCodes)
}

const getAbsenceCodeById = async (req, res) => {
    try {
        const data = await absenceCodeModel.findById(req.params.id);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({msg: "Absence code not found"})
    }
}

const addAbsenceCode = async (req, res) => {
    try {
        const newAbsenceCode = await absenceCodeModel.create({...req.body})
        res.status(201).json({msg: "Absence code created", newAbsenceCode})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const updateAbsenceCode = async (req, res) => { 
    try {
        await absenceCodeModel.findByIdAndUpdate(req.params.id, {...req.body})
        res.status(200).json({msg: "Absence code updated"})
    } catch (error) {
        res.status(404).json({msg: "Absence code not found"})
    }
}

const deleteAbsenceCode = async (req, res) => {
    try {
        await absenceCodeModel.findByIdAndUpdate(req.params.id, {removedAt: new Date()})
        res.status(200).json({ msg: "Absence code removed successfully" })
    } catch (error) {
        res.status(404).json({msg: "User not found"})
    }
}

module.exports = { 
    getAbsenceCodes, 
    getAbsenceCodeById, 
    addAbsenceCode,
    updateAbsenceCode,
    deleteAbsenceCode
}  