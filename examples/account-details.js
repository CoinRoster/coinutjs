const assert = require('assert');
const Coinut = require('../dist');

// import environment variables
const username = process.env.COINUT_USERNAME || '';
const apiKey = process.env.COINUT_API_KEY || '';

// ensure environment variables are defined
assert(username, 'Missing environment variable COINUT_USERNAME. Type ' +
  '`export COINUT_USERNAME=<your username>` in the terminal and try again.');

assert(apiKey, 'Missing environment variable COINUT_API_KEY. Type ' +
  '`export COINUT_API_KEY=<your api key>` in the terminal and try again.');

const coinut = new Coinut(username, apiKey);

const errorHandler = (error) => {
  console.error('Error connecting to Coinut:', error.message);
};

coinut.getBalance()
  .then(responseData => {
    console.log('Balance:', responseData.balance);
    console.log('Free Margin:', responseData.free_margin);
    console.log('Margin:', responseData.margin);
  })
  .catch(errorHandler);

coinut.getOrders()
  .then(orders => {
    console.log('Orders:', orders);
  })
  .catch(errorHandler);

coinut.getPositions()
  .then(positions => {
    console.log('Positions:', positions);
  })
  .catch(errorHandler);
