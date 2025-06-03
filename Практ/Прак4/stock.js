const stocks = [
  {
    stock_name: "EFX",
    company_name: "Equifax Inc",
    price: 163.55,
    currency: "USD",
    change: "-9.03"
  },
  {
    stock_name: "IBM",
    company_name: "Iron Mountain Inc",
    price: 33.21,
    currency: "USD",
    change: "-1.42"
  },
  {
    stock_name: "NTAP",
    company_name: "NetApp Inc",
    price: 54.81,
    currency: "USD",
    change: "-6.81"
  },
  {
    stock_name: "CTL",
    company_name: "CenturyLink Inc",
    price: 13.79,
    currency: "USD",
    change: "-1.37"
  }
];

// Функция для определения цвета изменения цены
function getChangeColor(change) {
  return change.startsWith('-') ? 'red' : 'green';
}

// Генерация HTML-таблицы
function generateStockTable(stockData) {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Stock Market Data</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .positive {
          color: green;
        }
        .negative {
          color: red;
        }
      </style>
    </head>
    <body>
      <h1>Stock Market Data</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
  `;

  // Добавляем строки с данными об акциях
  stockData.forEach(stock => {
    const changeColor = getChangeColor(stock.change);
    html += `
      <tr>
        <td>${stock.stock_name}</td>
        <td>${stock.company_name}</td>
        <td>${stock.price} ${stock.currency}</td>
        <td class="${changeColor === 'green' ? 'positive' : 'negative'}">
          ${stock.change}
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  return html;
}

// Генерируем HTML и выводим его
const htmlOutput = generateStockTable(stocks);
console.log(htmlOutput);

// Для сохранения в файл (раскомментируйте если нужно)
// const fs = require('fs');
// fs.writeFileSync('stocks.html', htmlOutput);