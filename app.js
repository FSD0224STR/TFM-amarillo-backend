require('dotenv').config()
const express = require("express");
const cors = require('cors')
const port = 3000;

const app = express();

app.use(cors(corsOptions));
var corsOptions = { 
    origin: '*',
}
app.use(express.json());

const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@"+process.env.DB_SERVER + "/" + process.env.DB_NAME + "?retryWrites=true&w=majority";

async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected to db")
}
main().catch(err => console.log(err));

const { userRouter } = require("./routes/userRoutes");
const { absenceRouter } = require("./routes/absenceRoutes");
const { expenseRouter } = require("./routes/expenseRoutes");
const { taskRouter } = require("./routes/taskRoutes");
const { goalRouter } = require("./routes/goalRoutes");
const { departmentRouter } = require("./routes/departmentRoutes");
const { companyRouter } = require("./routes/companyRoutes");
const { requestsRouter } = require('./routes/requestsRouter');

app.use('/users', userRouter)
app.use('/absences', absenceRouter)
app.use('/expenses', expenseRouter)
app.use('/tasks', taskRouter)
app.use('/goals', goalRouter)
app.use('/departments', departmentRouter)
app.use('/companies', companyRouter)
app.use('/requests', requestsRouter)

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = { app, server };
