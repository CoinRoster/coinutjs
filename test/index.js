import assert from 'assert';
import { add } from '../dist/index';

describe('CoinutJS', () => {
  describe('Adding function #Just to test that everything is working!', () => {
    it('should add two numbers', () => {
      const result = add(2, 3);
      const expected = 5;
      assert.equal(result, expected);
    });
  });
});
