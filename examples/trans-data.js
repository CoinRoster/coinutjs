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

// Examples for Get Expiry Time
coinut.getExpiry_Time('VANILLA_OPTION', 'BTCUSD', 'CALL' )
  .then(expiry_time => {
    console.log('Expiry Time:', expiry_time);
  })
  .catch(errorHandler);

//Examples for Get Assets
coinut.getAssets('VANILLA_OPTION')
  .then(assets => {
    console.log('VANILLA Assets:', assets);
  })
  .catch(errorHandler);

coinut.getAssets('BINARY_OPTION')
  .then(assets => {
    console.log('BINARY Assets:', assets);
  })
  .catch(errorHandler);

//Examples for Get Strike Prices

coinut.getStrike_Prices('VANILLA_OPTION', 'BTCUSD', 1469908800 )
  .then(strike_prices => {
    console.log('Strike Price (VANILLA):', strike_prices);
  })
  .catch(errorHandler);

coinut.getStrike_Prices('BINARY_OPTION', 'BTCUSD', 1469908800 )
  .then(strike_prices => {
    console.log('Strike Price (BINARY):', strike_prices);
  })
  .catch(errorHandler);

//Tick Examples
coinut.getTick('BTCUSD')
  .then(tick => {
    console.log('TICK USD:', tick);
  })
  .catch(errorHandler);

coinut.getTick('BTCCNY')
  .then(tick => {
    console.log('TICK CNY:', tick);
  })
  .catch(errorHandler);

// Orderbook Examples
coinut.getOrderbook('BINARY_OPTION', 'BTCUSD', 1469908800, '250', 'CALL' )
  .then(orderbook => {
    console.log('Orderbook (1):', orderbook);
  })
  .catch(errorHandler);

coinut.getOrderbook('BINARY_OPTION', 'BTCUSD', 1469908800, '250', 'PUT' )
  .then(orderbook => {
    console.log('Orderbook (2):', orderbook);
  })
  .catch(errorHandler);
