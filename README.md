# CoinutJS

[![CircleCI](https://circleci.com/gh/CoinRoster/coinutjs.svg?style=shield)](https://circleci.com/gh/CoinRoster/coinutjs)
[![Coverage Status](https://coveralls.io/repos/github/CoinRoster/coinutjs/badge.svg?branch=master)](https://coveralls.io/github/CoinRoster/coinutjs?branch=master)

This is an unofficial API for coinut.com, sponsored by [CoinRoster](https://www.coinroster.com/)

## Work In Progress!

Please note that this repository is a work in progress. The API is unstable and should not be considered production ready.

## Getting Started

### Setup

Install [node.js](https://nodejs.org/en/), preferably with [nvm](https://github.com/creationix/nvm).

### Installation

`npm install coinut` - to install all dependencies

### Usage

- All functions return promises that resolve to the raw JSON objects returned by the [Coinut API](https://coinut.com/api_doc)
- The Coinut API uses [snake_case](https://en.wikipedia.org/wiki/Snake_case). These values are returned as-is and are not converted to [camelCase](https://en.wikipedia.org/wiki/CamelCase)

See [examples](./examples) for code snippets that can be run directly from the terminal.

#### Instantiation

```JavaScript
const coinut = new Coinut(username, apiKey);
```

#### Balance

```JavaScript
coinut.getBalance()
  .then(responseData => {
    console.log('Balance:', responseData.balance);
    console.log('Free Margin:', responseData.free_margin);
    console.log('Margin:', responseData.margin);
  })
  .catch(error => {
    console.error('Error connecting to Coinut:', error.message);
  });
```

#### Retrieve Open Orders

  ```JavaScript
  coinut.getOrders()
    .then(orders => {
      console.log('Orders:', orders);
    })
    .catch(error => {
      console.error('Error connecting to Coinut:', error.message);
    });
  );
  ```

### Development

The following npm scripts have been configured:

- `npm build` - compiles the *src* folder (ES6 code) into the *dist* folder (ES5 code, including source maps)
- `npm test` - lints the code, runs all unit tests and creates code coverage reports
- `npm run lint` - only lints the code (no message displayed on success, as per Unix standard)
- `npm run clean` - deletes the *dist* and *coverage* folders


#### Contributors
- Ashwin Balamohan [(@abmohan)](//github.com/abmohan)

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
