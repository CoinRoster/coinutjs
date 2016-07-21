import rp from 'request-promise';
import { encryption } from './utils';

const coinutApiBaseUrl = 'https://coinut.com/api';

function getAuthenticatedHeader(username, apiKey, payload) {
  return {
    'X-USER': username,
    'X-SIGNATURE': encryption.getHmacSha256(apiKey, payload)
  };
}

function coinutApiRequest(endpoint, username, apiKey, data) {
  const uri = `${coinutApiBaseUrl}/${endpoint}`;
  const requestContent = Object.assign({ nonce: encryption.getNonce() }, data);
  const body = JSON.stringify(requestContent);
  const headers = getAuthenticatedHeader(username, apiKey, body);

  const requestOptions = { uri, headers, body };
  return rp.post(requestOptions)
    .then(JSON.parse);
}

function coinutApiRequestNoAuth(endpoint, data) {
  const uri = `${coinutApiBaseUrl}/${endpoint}`;
  const requestContent = Object.assign({ nonce: encryption.getNonce() }, data);
  const body = JSON.stringify(requestContent);
  const headers = {};

  const requestOptions = { uri, headers, body};
  return rp.post(requestOptions)
    .then(JSON.parse);

}



class Coinut {
  constructor(username, apiKey, data) {
    this.username = username;
    this.apiKey = apiKey;
    this.data = data;
  }

  getBalance() {
    return coinutApiRequest('balance', this.username, this.apiKey);
  }

  getOrders() {
    return coinutApiRequest('orders', this.username, this.apiKey);
  }

  getPositions() {
    return coinutApiRequest('positions', this.username, this.apiKey);
  }

  getExpiry_Time(derivativeType, assetType, putcallType) {
      const data = { 'deriv_type' : derivativeType,
                     'asset' : assetType,
                     'put_call' : putcallType
                   };
        // payload data for request
    return coinutApiRequestNoAuth('expiry_time', data)
  }

  getAssets() {
    return coinutApiRequestNoAuth('assets')
  }




}

exports.default = module.exports = Coinut;
