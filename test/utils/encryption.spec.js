import { expect } from 'chai';

import encryption from '../../lib/utils/encryption';

describe('utils', () => {
  describe('encryption', () => {
    describe('encryption.getNonce', () => {
      it('should be a function', () => {
        expect(encryption.getNonce).to.be.a('function');
      });

      it('should return a 36-char string', () => {
        const nonce = encryption.getNonce();
        expect(nonce).to.be.a('string');
        expect(nonce.length).to.equal(36);
      });

      it('should not return the same nonce in 1000 trials', () => {
        const trials = 1000;
        const nonceMap = {};
        Array.from(new Array(trials), () => {
          const nonce = encryption.getNonce();
          expect(nonceMap[nonce]).to.be.undefined;
          nonceMap[nonce] = true;
        });
      });
    });

    describe('encryption.getHmacSha256', () => {
      it('should be a function', () => {
        expect(encryption.getHmacSha256).to.be.a('function');
      });

      it('should return HMAC-SHA256 digest when given key and payload', () => {
        // test case provided by Coinut API Doc: https://coinut.com/api_doc
        const key = 'bb8a56ceabe7e247fe0b32205e6fce26aac5';
        const payload = 'coinut';
        const expectedHash =
          'ac9315dccd191d097a36c7db5b2d633091c0034708c2b1cb340ae8aaccd79830';

        const actualHash = encryption.getHmacSha256(key, payload);
        expect(actualHash).to.be.a('string');
        expect(actualHash).to.equal(expectedHash);
      });

      it('should return a HMAC-SHA256 digest when only given a key', () => {
        // TODO: come up with a known correct answer and test against that

        const key = 'bb8a56ceabe7e247fe0b32205e6fce26aac5';
        const hash = encryption.getHmacSha256(key);
        expect(hash).to.be.a('string');
      });
    });
  });
});
