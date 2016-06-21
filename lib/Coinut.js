import rp from 'request-promise';
import { encryption } from './utils';

const coinutApiBaseUrl = 'https://coinut.com/api';

function getAuthenticatedHeader(username, apiKey, payload) {
  return {
    'X-USER': username,
    'X-SIGNATURE': encryption.getHmacSha256(apiKey, payload)
  };
}

function cointApiRequest(endpoint, username, apiKey, data) {
  const uri = `${coinutApiBaseUrl}/${endpoint}`;
  const requestContent = Object.assign({ nonce: encryption.getNonce() }, data);
  const body = JSON.stringify(requestContent);
  const headers = getAuthenticatedHeader(username, apiKey, body);

  const requestOptions = { uri, headers, body };
  return rp.post(requestOptions)
    .then(JSON.parse);
}


class Coinut {
  constructor(username, apiKey) {
    this.username = username;
    this.apiKey = apiKey;
  }

  getBalance() {
    return cointApiRequest('balance', this.username, this.apiKey);
  }

  getOrders() {
    return cointApiRequest('orders', this.username, this.apiKey);
  }
}

exports.default = module.exports = Coinut;
