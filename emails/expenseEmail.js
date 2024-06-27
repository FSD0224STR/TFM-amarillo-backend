module.exports = function generateEmailTemplate(expenseName, paymentDate, expenseTotal, expenseBreakdown) {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gasto aprobado</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        margin: 0;
        padding: 0;
        text-align: center;
    }
    .container {
        width: 90%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header img {
        height: 50px;
        margin: auto
    }
    .header {
        display: flex;
        justify-content: center;
    }
    .content {
        text-align: left;
        padding: 0 20px;
    }
    .highlight-box {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        background-color: #2cb9902e;
        border: 3px solid #2cb990;
        border-radius: 10px;
        padding: 15px;
        margin: 20px 0;
    }
    .highlight-text{
        font-size: 16px;
    }
    .highlight-box strong {
        display: block;
        margin-bottom: 10px;

    }
    .btn {
        display: inline-block;
        margin: 20px 0;
        padding: 10px 20px;
        font-size: 16px;
        color: #fff !important;
        background-color: #2cb990;
        text-decoration: none;
        border-radius: 5px;
    }
</style>

</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://tfm-amarillo-frontend.netlify.app/BudgetWiseNS.png" alt="BudgetWise Logo">
        </div>
        <div class="content">
            <h1>¡Tu gasto ha sido aprobado!</h1>
            <p>Los siguientes gastos están aprobados por Recursos Humanos:</p>
            <div class="highlight-box">
                <p><strong>Gasto: </strong>${expenseName}</p>
                <p><strong>Fecha de pago:</strong>${paymentDate}</p>
                <p><strong>Total:</strong>${expenseTotal}</p>
                <p><strong>Desglose con el nombre solo:</strong>${expenseBreakdown}</p>
                <p><strong>Desglose con .dietas:</strong>${expenseBreakdown.Dietas}</p>
            </div>
            <p>Cualquier consulta, no dudes en contactarnos.</p>
        </div>
    </div>
</body>
</html>
`
};