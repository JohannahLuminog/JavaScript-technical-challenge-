const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

function drawLine(start, end, style) {
  ctx.beginPath();
  ctx.strokeStyle = style || 'black';
  ctx.moveTo(...start);
  ctx.lineTo(...end);
  ctx.stroke();
}

function drawTriangle(apex1, apex2, apex3) {
  ctx.beginPath();
  ctx.moveTo(...apex1);
  ctx.lineTo(...apex2);
  ctx.lineTo(...apex3);
  ctx.fill();
}

drawLine([50, 50], [50, 550]);
drawTriangle([35, 50], [65, 50], [50, 35]);

drawLine([50, 550], [950, 550]);
drawTriangle([950, 535], [950, 565], [965, 550]);

// Define an empty array to hold the stock symbols
let stockSymbols = [];

// Code to query the backend for the list of available stocks and data for each stock
document.addEventListener('DOMContentLoaded', function () {
  // Make the spinner visible
  const spinner = document.querySelector('.spinner'); // Adjust the selector
  spinner.style.display = 'block';

   fetch('/stocks')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      return response.json();
    })
    .then((data) => {
      stockSymbols = data.stockSymbols;
      console.log('Available Stocks:', stockSymbols);

      // Loop through the available stock symbols and fetch data for each
      stockSymbols.forEach((symbol) => {
        fetch(`/stocks/${symbol}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch data for ${symbol}`);
            }
            return response.json();
          })
          .then((stockData) => {
            console.log(`Data for ${symbol}:`);
            console.table(stockData); // Use console.table to display data in a structured/tabular way

            // You can now do something with the data for each stock
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });

      // Hide the spinner after all data is loaded
      spinner.style.display = 'none';
      console.log('Spinner is now hidden');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

