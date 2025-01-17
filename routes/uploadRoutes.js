const { Router } = require("express");
const multer = require("multer");
const uploadRouter = Router();

const {
    uploadProfileImage,
    uploadCompanyLogo,
    uploadExpensesProof,
    deleteExpenseProof
} = require("../controllers/uploadController");
const { authenticatedToken, isHr } = require("../controllers/userController");
const upload = multer({ dest: "uploads/" });

uploadRouter.post(
    "/user",
    upload.single("file"),
    authenticatedToken,
    uploadProfileImage
);
uploadRouter.post(
    "/company/:id?",
    upload.single("file"),
    authenticatedToken,
    isHr,
    uploadCompanyLogo
);
uploadRouter.post(
    "/expenses/:id?",
    upload.array("files", 10),
    authenticatedToken,
    uploadExpensesProof
);

uploadRouter.delete(
     "/expenseproof/:id?",
     authenticatedToken,
     deleteExpenseProof
);

module.exports = { uploadRouter };
