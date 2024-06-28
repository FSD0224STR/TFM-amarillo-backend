const expenseModel = require('../models/expense.model')
const transporter = require('../transporter')
const generateEmailTemplate = require('../emails/expenseEmail')

const getExpenses = async (req, res) => {
    const expenses = await expenseModel.find().populate({
        path: "absenceId",
            populate: [
                {path: "employeeId",
                    populate: 
                        {path: "departmentId",}}, 
                {path: "absenceCodeId",}
            ],
    })
    console.log("Gastos obtenidos")
    res.status(200).json(expenses)
}

const getExpenseById = async (req, res) => {
    try {
        const data = await expenseModel.findById(req.params.id);
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({msg: "Expense not found"})
    }
}

const addExpense = async (req, res) => {
    try {
        const newExpense = await expenseModel.create({...req.body})
        console.log("Nuevos gasto: ", newExpense)
        res.status(201).json({msg: "Expense created", newExpense})
    } catch (error) {
        res.status(400).json({msg: "You missed some parameter", error: error.message})
    }
}

const updateExpense = async (req, res) => { 
    try {
        //const data = 
        await expenseModel.findByIdAndUpdate(req.params.id, {expenseStatus: "Aprobado", ...req.body})
        // .populate({
        //     path: 'absenceId',
        //         populate: [
        //             {path: 'employeeId'},
        //             {path: "absenceCodeId"}
        //         ]
        // });
        // const expenseName = data.absenceId.absenceCodeId.absenceName;
        // const paymentDate = data.expensePayment
        // const expenseTotal = data.expenseCodeId.map((code, index) => (
        //             key={index},
        //             (code.Hospedajes > 0 ? code.Hospedajes : 0) +
        //             (code.Dietas > 0 ? code.Dietas : 0) +
        //             (code.Traslados > 0 ? code.Traslados : 0)
        // ))
        // const expenseBreakdown = data.expenseCodeId.map((code, index) => ({
        //     index: index,
        //     hospedajes: code.Hospedajes > 0 ? code.Hospedajes : 0,
        //     dietas: code.Dietas > 0 ? code.Dietas : 0,
        //     traslados: code.Traslados > 0 ? code.Traslados : 0,
        // }));
        
        // console.log("expenseBreakdown0.dietas", expenseBreakdown[0].dietas)

        // const expenseEmail = generateEmailTemplate(expenseName, paymentDate, expenseTotal, expenseBreakdown)

        // const email = {
        //     from: "fsd24amarillo@gmail.com",
        //     to: data.absenceId.employeeId.email,
        //     subject: `Gasto aprobado: ${data.absenceId.absenceCodeId.absenceName}`,
        //     html: expenseEmail,
        // };
        // transporter.sendMail(email, function(error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("Email sent: " + info.response);
        //     }
        // })
        res.status(200).json({msg: "Expense updated and approved"})
    } catch (error) {
        res.status(404).json({msg: "Expense not found"})
    }
}

const emailExpense = async (req, res) => { 
    try {
        const data = await expenseModel.findById(req.params.id).populate({
            path: 'absenceId',
                populate: [
                    {path: 'employeeId'},
                    {path: "absenceCodeId"}
                ]
        });
        const expenseName = data.absenceId.absenceCodeId.absenceName;
        const paymentDate = data.expensePayment
        const expenseTotal = data.expenseCodeId.map((code, index) => (
                    key={index},
                    (code.Hospedajes > 0 ? code.Hospedajes : 0) +
                    (code.Dietas > 0 ? code.Dietas : 0) +
                    (code.Traslados > 0 ? code.Traslados : 0)
        ))
        const expenseBreakdown = data.expenseCodeId.map((code, index) => ({
            index: index,
            hospedajes: code.Hospedajes > 0 ? code.Hospedajes : 0,
            dietas: code.Dietas > 0 ? code.Dietas : 0,
            traslados: code.Traslados > 0 ? code.Traslados : 0,
        }));

        const expenseEmail = generateEmailTemplate(expenseName, paymentDate, expenseTotal, expenseBreakdown)

        const email = {
            from: "fsd24amarillo@gmail.com",
            to: data.absenceId.employeeId.email,
            subject: `Gasto aprobado: ${data.absenceId.absenceCodeId.absenceName}`,
            html: expenseEmail,
        };
        transporter.sendMail(email, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        })
        res.status(200).json({msg: "Expense found, and email sent"})
    } catch (error) {
        res.status(404).json({msg: "Expense not found"})
    }
}

const emailExpenseApproved = async (req, res) => { 
    try {
        const data = await expenseModel.findById(req.params.id).populate({
            path: 'absenceId',
                populate: [
                    {path: 'employeeId'},
                    {path: "absenceCodeId"}
                ]
        });
        const expenseApproveDate = Date();
        const expenseName = data.absenceId.absenceCodeId.absenceName;
        const expenseTotal = data.expenseCodeId.map((code, index) => (
                    key={index},
                    (code.Hospedajes > 0 ? code.Hospedajes : 0) +
                    (code.Dietas > 0 ? code.Dietas : 0) +
                    (code.Traslados > 0 ? code.Traslados : 0)
        ))
        const expenseBreakdown = data.expenseCodeId.map((code, index) => ({
            index: index,
            hospedajes: code.Hospedajes > 0 ? code.Hospedajes : 0,
            dietas: code.Dietas > 0 ? code.Dietas : 0,
            traslados: code.Traslados > 0 ? code.Traslados : 0,
        }));

        const expenseEmail = generateEmailTemplate(expenseApproveDate, expenseName, expenseTotal, expenseBreakdown)

        const email = {
            from: "fsd24amarillo@gmail.com",
            to: data.absenceId.employeeId.email,
            subject: `Gasto recibido: ${data.absenceId.absenceCodeId.absenceName}`,
            html: expenseEmail,
        };
        transporter.sendMail(email, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        })
        res.status(200).json({msg: "Expense found, and email sent"})
    } catch (error) {
        res.status(404).json({msg: "Expense not found"})
    }
}

const deleteExpense = async (req, res) => {
    try {
        await expenseModel.findByIdAndUpdate(req.params.id, {removedAt: new Date()})
        res.status(200).json({ msg: "Expense removed successfully" })
    } catch (error) {
        res.status(404).json({msg: "Expense not found"})
    }
}

module.exports = { 
    getExpenses, 
    getExpenseById, 
    addExpense,
    updateExpense,
    deleteExpense,
    emailExpense,
    emailExpenseApproved
}  