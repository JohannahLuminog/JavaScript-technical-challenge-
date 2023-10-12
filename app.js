const express = require('express');
const path = require('path');
const stocks = require('./stocks');

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

app.get('/stocks', async (req, res) => {
  try {
    const stockSymbols = await stocks.getStocks();
    res.send({ stockSymbols });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve stock data.' });
  }
});

app.get('/stocks/:symbol', async (req, res) => {
  const { params: { symbol } } = req;
  try {
    const data = await stocks.getStockPoints(symbol, new Date());
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve stock data.' });
  }
});

app.listen(3000, () => console.log('Server is running!'));