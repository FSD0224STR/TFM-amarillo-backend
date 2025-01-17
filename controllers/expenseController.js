const expenseModel = require("../models/expense.model");
const transporter = require("../transporter");
const {
    generateEmailTemplate,
    generateApprovalEmailTemplate,
} = require("../emails/expenseEmail");
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getExpenses = async (req, res) => {
    const expenses = await expenseModel.find().populate({
        path: "absenceId",
        populate: [
            { path: "employeeId", populate: { path: "departmentId" } },
        ],
    });
    console.log("Gastos obtenidos");
    res.status(200).json(expenses);
};

const getExpenseById = async (req, res) => {
    try {
        const data = await expenseModel.findById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ msg: "Expense not found" });
    }
};

const addExpense = async (req, res) => {
    try {
        const newExpense = await expenseModel.create({
            expenseStatus: "Pendiente",
            ...req.body,
        });
        console.log("Nuevos gasto: ", newExpense);
        res.status(201).json({ msg: "Expense created", newExpense });
    } catch (error) {
        res.status(400).json({
            msg: "You missed some parameter",
            error: error.message,
        });
    }
};

const updateExpense = async (req, res) => {
    try {
        const data = await expenseModel.findByIdAndUpdate(req.params.id, {
            //   expenseStatus: "Aprobado",
            ...req.body,
        });
        res.status(200).json({ msg: "Expense updated and approved" });
    } catch (error) {
        res.status(404).json({ msg: "Expense not found", error });
    }
};

const emailExpense = async (req, res) => {
    try {
        const data = await expenseModel.findByIdAndUpdate(req.params.id, { expenseStatus: "Aprobado", })
            .populate({
                path: "absenceId",
                populate: [{ path: "employeeId" }],
            });
        const expenseName = data.absenceId.absenceName;
        const paymentDate = data.expensePayment;
        const expenseTotal =
            (data.expenseFood ? data.expenseFood : 0) +
            (data.expenseLodging ? data.expenseLodging : 0) +
            (data.expenseTravel ? data.expenseTravel : 0);
        const expenseFood = data.expenseFood;
        const expenseLodging = data.expenseLodging;
        const expenseTravel = data.expenseTravel;

        const expenseEmail = generateEmailTemplate(
            expenseName,
            paymentDate,
            expenseTotal,
            expenseFood,
            expenseLodging,
            expenseTravel
        );

        const email = {
            from: "fsd24amarillo@gmail.com",
            to: data.absenceId.employeeId.email,
            subject: `Gasto aprobado: ${data.absenceId.absenceName}`,
            html: expenseEmail,
        };
        transporter.sendMail(email, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        res.status(200).json({ msg: "Expense found, and email sent" });
    } catch (error) {
        res.status(404).json({ msg: "Expense not found" });
    }
};

const emailExpenseApproved = async (req, res) => {
    try {
        const data = await expenseModel
            .findByIdAndUpdate(req.params.id, {
                expenseStatus: "Aprobado",
                expensePayment: Date(),
            })
            .populate({
                path: "absenceId",
                populate: [{ path: "employeeId" }],
            });
        const expenseApproveDate = Date();
        const expenseName = data.absenceId.absenceName;
        const expenseTotal =
            (data.expenseFood ? data.expenseFood : 0) +
            (data.expenseLodging ? data.expenseLodging : 0) +
            (data.expenseTravel ? data.expenseTravel : 0);
        const expenseFood = data.expenseFood;
        const expenseLodging = data.expenseLodging;
        const expenseTravel = data.expenseTravel;

        const expenseApproveEmail = generateApprovalEmailTemplate(
            expenseApproveDate,
            expenseName,
            expenseTotal,
            expenseFood,
            expenseLodging,
            expenseTravel
        );

        const email = {
            from: "fsd24amarillo@gmail.com",
            to: data.absenceId.employeeId.email,
            subject: `Gasto recibido: ${data.absenceId.absenceName}`,
            html: expenseApproveEmail,
        };
        transporter.sendMail(email, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        res.status(200).json({ msg: "Expense found, and email sent" });
    } catch (error) {
        res.status(404).json({ msg: "Expense not found" });
    }
};

const deleteExpense = async (req, res) => {
    try {
        await expenseModel.findByIdAndUpdate(req.params.id, {
            removedAt: new Date(),
        });
        res.status(200).json({ msg: "Expense removed successfully" });
    } catch (error) {
        res.status(404).json({ msg: "Expense not found" });
    }
};

module.exports = {
    getExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense,
    emailExpense,
    emailExpenseApproved,
};
