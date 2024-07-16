const cloudinary = require("cloudinary");
const fs = require("fs");

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
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const urls = [];
    try {
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            urls.push(result.secure_url);
            fs.unlinkSync(file.path);
        }
        const expense = await expenseModel.findByIdAndUpdate(req.params.id, {
            $push: { expenseProof: { $each: urls } }
        }, { new: true });

        if (!expense) {
            return res.status(404).json({ msg: "Expense not found" });
        }

        res.status(200).json({ msg: "Expense proof updated", data: urls });
    } catch (error) {
        console.error("Error uploading or updating expense proof:", error);
        res.status(500).json({
            msg: "Error uploading or updating expense proof",
            error: error.message,
        });
    }
};

const deleteExpenseProof = async (req, res) => {
    const { url } = req.body;

    try {
        const publicId = url.slice(-24, -4)

        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary delete result:", result);

        const expense = await expenseModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { expenseProof: url } },
            { new: true }
        );

        if (!expense) {
            return res.status(404).json({ msg: "Expense not found" });
        }
        res.status(200).json({ msg: "Expense proof deleted", data: expense });
    } catch (error) {
        console.error("Error deleting expense proof:", error);
        res.status(500).json({
            msg: "Error deleting expense proof",
            error: error.message,
        });
    }
};


module.exports = {
    uploadProfileImage,
    uploadCompanyLogo,
    uploadExpensesProof,
    deleteExpenseProof
};
