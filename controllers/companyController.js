const companyModel = require('../models/company.model')

const getCompanies = async (req, res) => {
    const companies = await companyModel.find({removedAt: {$eq: null}})
    console.log("Companies found")
    res.status(200).json(companies)
}

const getCompanyById = async (req, res) => {
    try {
        const data = await companyModel.findById(req.params.id);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({msg: "Company not found"})
    }
}

const addCompany = async (req, res) => {
    try {
        const newCompany = await companyModel.create({...req.body})
        console.log("New company: ", newCompany)
        res.status(201).json({msg: "Company created", newCompany})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const updateCompany = async (req, res) => { 
    try {
        await companyModel.findByIdAndUpdate(req.params.id, {...req.body})
        res.status(200).json({msg: "Company updated"})
    } catch (error) {
        res.status(404).json({msg: "Company not found"})
    }
}

const deleteCompany = async (req, res) => {
    try {
        await companyModel.findByIdAndUpdate(req.params.id, {removedAt: new Date()})
        res.status(200).json({ msg: "Company removed successfully" })
    } catch (error) {
        res.status(404).json({msg: "Company not found"})
    }
}

module.exports = { 
    getCompanies, 
    getCompanyById, 
    addCompany,
    updateCompany,
    deleteCompany
}  