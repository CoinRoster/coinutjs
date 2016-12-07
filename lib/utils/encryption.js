import crypto from 'crypto';
import uuid from 'uuid';

function getHmacSha256(key, payload = '') {
  // declare constants
  const algo = 'sha256';
  const digest = 'hex';

  const hmac = crypto.createHmac(algo, key);
  return hmac.update(payload).digest(digest);
}

function getNonce() {
  return uuid.v4();
}

exports.default = module.exports = {
  getHmacSha256,
  getNonce
};
