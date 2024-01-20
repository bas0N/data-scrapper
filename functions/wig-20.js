const puppeteer = require('puppeteer');

const fetchWig20Table = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the page with the table
  await page.goto('https://www.bankier.pl/inwestowanie/profile/quote.html?symbol=WIG20');


  // Define column names
  const columnNames = [
    'Nazwa',
    'Ticker',
    'Kurs',
    'Zmiana',
    'Zmiana Procentowa',
    'Wpływ na indeks',
    'Udział w obrocie',
    'Pakiet',
    'Udział w portfelu',
  ];

  // Extract data from the specified table
  const tableData = await page.evaluate((columns) => {
    const data = [];
    // Target the specific table with the class "box945"
    const tableRows = document.querySelectorAll('.box945 table tbody tr');

    tableRows.forEach((row) => {
      const rowData = {};
      const cells = row.querySelectorAll('td');

      cells.forEach((cell, index) => {
        const columnName = columns[index];
        rowData[columnName] = cell.textContent.trim();
      });

      data.push(rowData);
    });

    return data;
  }, columnNames);


  await browser.close();

  return {
    tableData,
    columnNames,
    timestamp: new Date().toISOString(),
  };
};
