const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const myTokenSecret = process.env.MYTOKENSECRET;

const userModel = require("../models/user.model");
const companyModel = require("../models/company.model");
const expenseModel = require("../models/expense.model");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadProfileImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send("There are no files attached");
    }
    cloudinary.uploader.upload(req.file.path, async (result, error) => {
        try {
            if (error) {
                fs.unlinkSync(req.file.path);
                return res.status(500).send(error);
            }
            const urlToUpdate = { profilePic: result.url };
            const data = await userModel.findByIdAndUpdate(req.user.id, {
                ...urlToUpdate,
            });
            if (!data) {
                fs.unlinkSync(req.file.path);
                return res.status(404).json({ msg: "User not found" });
            }
            fs.unlinkSync(req.file.path);
            res.status(200).json({ msg: "User updated", url: result.url });
        } catch (error) {
            fs.unlinkSync(req.file.path);
            res.status(500).json({
                msg: "Error uploading or updating profile image",
                error: error.message,
            });
        }
    });
};

const uploadCompanyLogo = async (req, res) => {
    if (!req.file) {
        return res.status(400).send("There are no files attached");
    }
    cloudinary.uploader.upload(req.file.path, async (result, error) => {
        try {
            if (error) {
                fs.unlinkSync(req.file.path);
                return res.status(500).send(error);
            }
            const urlToUpdate = { companyLogo: result.url };
            const data = await companyModel.findByIdAndUpdate(req.params.id, {
                ...urlToUpdate,
            });
            if (!data) {
                fs.unlinkSync(req.file.path);
                return res.status(404).json({ msg: "Bussiness not found" });
            }
            fs.unlinkSync(req.file.path);
            res.status(200).json({ msg: "Bussiness updated", url: result.url });
        } catch (error) {
            fs.unlinkSync(req.file.path);
            res.status(500).json({
                msg: "Error uploading or updating company logo",
                error: error.message,
            });
        }
    });
};

const uploadExpensesProof = async (req, res) => {
    if (!req.file) {
        return res.status(400).send("There are no files attached");
    }
    cloudinary.uploader.upload(req.file.path, async (result, error) => {
        try {
            if (error) {
                fs.unlinkSync(req.file.path);
                return res.status(500).send(error);
            }
            const urlToUpdate = { expenseProof: result.url };
            const data = await expenseModel.findByIdAndUpdate(req.params.id, {
                ...urlToUpdate,
            });
            if (!data) {
                fs.unlinkSync(req.file.path);
                return res.status(404).json({ msg: "Expense not found" });
            }
            fs.unlinkSync(req.file.path);
            res.status(200).json({ msg: "Expense updated", url: result.url });
        } catch (error) {
            fs.unlinkSync(req.file.path);
            res.status(500).json({
                msg: "Error uploading or updating expense proof",
                error: error.message,
            });
        }
    });
};

module.exports = {
    uploadProfileImage,
    uploadCompanyLogo,
    uploadExpensesProof,
};
