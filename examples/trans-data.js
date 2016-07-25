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

coinut.getExpiry_Time('VANILLA_OPTION', 'BTCUSD', 'CALL' )
  .then(expiry_time => {
    console.log('Expiry Time:', expiry_time);
  })
  .catch(errorHandler);

coinut.getAssets()
  .then(assets => {
    console.log('Assets:', assets);
  })
  .catch(errorHandler);
