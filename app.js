const express = require('express');
const path = require('path');
const stocks = require('./stocks');

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

// Route to get a list of available stocks
app.get('/stocks', async (req, res) => {
  try {
    const stockSymbols = await stocks.getStocks();
    res.send({ stockSymbols });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve list of available stocks.' });
  }
});

// Route to get data for a specific stock
app.get('/stocks/:symbol', async (req, res) => {
  const { params: { symbol } } = req;
  //Use try-catch block to catch errors and send an error message
  try {
    const data = await stocks.getStockPoints(symbol, new Date());
    res.send(data);
  } catch (error) {
    // Handle the error and send an error message 
    res.status(500).json({ error: 'Failed to retrieve stock data.' });
  }
});

app.listen(3000, () => console.log('Server is running!'));