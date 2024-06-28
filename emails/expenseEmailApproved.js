module.exports = function generateEmailTemplate(expenseApproveDate, expenseName, expenseTotal, expenseBreakdown) {
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
        display: grid;
        justify-content: center;
    }
    .content {
        text-align: left;
        padding: 0 20px;
    }
    .highlight-box {
        display: grid;
        grid-template-columns: repeat(3, 200px);
        grid-template-rows: 80px 40px 80px;
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
            <p>Los siguientes gastos han sido recibidos por Recursos Humanos el ${expenseApproveDate}:</p>
            <div class="highlight-box">
                <p><strong>Gasto: </strong>${expenseName}</p>
                <p><strong>Total: </strong>${expenseTotal} €</p>
                <p><strong>Desglose: </strong></p>
        <table>
            <tr>
                <td colspan="4"><strong>Traslados:</strong>${expenseBreakdown[0].traslados} €</td>
                <td colspan="4"><strong>Hospedajes:</strong>${expenseBreakdown[0].hospedajes} €</td>
                <td colspan="4"><strong>Dietas:</strong>${expenseBreakdown[0].dietas} €</td>
            </tr>
        </table>
            </div>
            <p>Cualquier consulta, no dudes en contactarnos.</p>
        </div>
    </div>
</body>
</html>
`
};