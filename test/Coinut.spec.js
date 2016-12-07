import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Promise } from 'core-js';
import rp from 'request-promise';
import sinon from 'sinon';

import Coinut from '../lib/Coinut';

// set up chai
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Coinut', () => {
  const apiKey = 'bb8a56ceabe7e247fe0b32205e6fce26aac5';
  const username = 'coinut';
  let coinut;

  beforeEach(() => {
    // instantiate new instance of coinut
    coinut = new Coinut(username, apiKey);
  });

  describe('Coinut.constructor', () => {
    it('should be a function', () => {
      expect(coinut.constructor).to.exist;
      expect(coinut.constructor).to.be.a('function');
    });

    it('should set the username', () => {
      expect(coinut.username).to.exist;
      expect(coinut.username).to.equal(username);
    });

    it('should set the API key', () => {
      expect(coinut.apiKey).to.exist;
      expect(coinut.apiKey).to.equal(apiKey);
    });
  });

  describe('Coinut.getBalance', () => {
    const mockResponseData = {
      balance: '0.00480000',
      free_margin: '0.00480000',
      margin: '0.00480000'
    };

    let balanceP;
    let rpStub;

    beforeEach(() => {
      // return stubbed response instead of actual POST call to Coinut
      rpStub = sinon.stub(rp, 'post');
      rpStub.returns(Promise.resolve(JSON.stringify(mockResponseData)));

      // make API request call
      balanceP = coinut.getBalance();
    });

    afterEach(() => {
      // restore stubbed function
      rp.post.restore();
    });

    it('should be a function', () => {
      expect(coinut.getBalance).to.exist;
      expect(coinut.getBalance).to.be.a('function');
    });

    it('should contain a balance property', () => {
      return expect(balanceP).to.eventually.have.property('balance');
    });

    it('should contain a free margin property', () => {
      return expect(balanceP).to.eventually.have.property('free_margin');
    });

    it('should contain a margin property', () => {
      return expect(balanceP).to.eventually.have.property('margin');
    });
  });

  describe('Coinut.getOrders', () => {
    const mockResponseData = [{
      'status': 'ORDER_OPEN',
      'put_call': 'CALL',
      'expiry_time': 1423713600,
      'timestamp': 1423664086,
      'price': '0.00500000',
      'open_close': 'OPEN',
      'deriv_type': 'BINARY_OPTION',
      'side': 'BUY',
      'amount': 5,
      'asset': 'BTCUSD',
      'strike': '230.00000000',
      'type': 'LIMIT',
      'id': 'c674382ba3234242e00a627075c15aa0aa32'
    }, {
      'status': 'ORDER_OPEN',
      'put_call': 'CALL',
      'expiry_time': 1423742400,
      'timestamp': 1423664086,
      'price': '0.50000000',
      'open_close': 'OPEN',
      'deriv_type': 'VANILLA_OPTION',
      'side': 'BUY',
      'amount': 5,
      'asset': 'BTCUSD',
      'strike': '250.00000000',
      'type': 'LIMIT',
      'id': 'f266110ba7fe224bd409b970ab501d7f0cfc'
    }];

    let ordersP;
    let rpStub;

    beforeEach(() => {
      // return stubbed response instead of actual POST call to Coinut
      rpStub = sinon.stub(rp, 'post');
      rpStub.returns(Promise.resolve(JSON.stringify(mockResponseData)));

      // API request call
      ordersP = coinut.getOrders();
    });

    afterEach(() => {
      // restore stubbed function
      rp.post.restore();
    });

    it('should be a function', () => {
      expect(coinut.getOrders).to.exist;
      expect(coinut.getOrders).to.be.a('function');
    });

    it('should return an orders array', () => {
      return expect(ordersP).to.eventually.deep.equal(mockResponseData);
    });

  });

  describe('Coinut.getPositions', () => {
    const mockResponseData = [{
      'status': 'POSITION_OPEN',
      'put_call': 'CALL',
      'close_time': 0,
      'expiry_time': 1423670400,
      'open_time': 1423664943,
      'timestamp': 1423664943,
      'price': '0.05000000',
      'deriv_type': 'VANILLA_OPTION',
      'side': 'BUY',
      'amount': 1,
      'asset': 'BTCUSD',
      'strike': '222.00000000',
      'close_price': '0.00000000',
      'id': 'b5ae7d46ab1fc24e5b08ab505e803ac15aba'
    }];

    let positionsP;
    let rpStub;

    beforeEach(() => {
      // return stubbed response instead of actual POST call to Coinut
      rpStub = sinon.stub(rp, 'post');
      rpStub.returns(Promise.resolve(JSON.stringify(mockResponseData)));

      // make API request call
      positionsP = coinut.getPositions();
    });

    afterEach(() => {
      // restore stubbed function
      rp.post.restore();
    });

    it('should be a function', () => {
      expect(coinut.getPositions).to.exist;
      expect(coinut.getPositions).to.be.a('function');
    });

    it('should return a positions array', () => {
      return expect(positionsP).to.eventually.deep.equal(mockResponseData);
    });
 });

 describe('Coinut.getExpiry_Time', () => {
   const mockResponseData = [1423656000, 1423670400, 1423684800, 1423699200, 1423713600, 1423728000];

   let expiry_timeP;
   let rpStub;

   beforeEach(() => {
     // return stubbed response instead of actual POST call to Coinut
     rpStub = sinon.stub(rp, 'post');
     rpStub.returns(Promise.resolve(JSON.stringify(mockResponseData)));

     // make API request call
     expiry_timeP = coinut.getExpiry_Time();
   });

   afterEach(() => {
     // restore stubbed function
     rp.post.restore();
   });

   it('should be a function', () => {
     expect(coinut.getExpiry_Time).to.exist;
     expect(coinut.getExpiry_Time).to.be.a('function');
   });

   it('should return an array of Expiry Times', () => {
     return expect(expiry_timeP).to.eventually.deep.equal(mockResponseData);
   });
});

describe('Coinut.getAssets', () => {
  const mockResponseData = ["BTCUSD", "BTCCNY", "BTCEUR"];

  let assetsP;
  let rpStub;

  beforeEach(() => {
    // return stubbed response instead of actual POST call to Coinut
    rpStub = sinon.stub(rp, 'post');
    rpStub.returns(Promise.resolve(JSON.stringify(mockResponseData)));

    // make API request call
    assetsP = coinut.getAssets();
  });

  afterEach(() => {
    // restore stubbed function
    rp.post.restore();
  });

  it('should be a function', () => {
    expect(coinut.getAssets).to.exist;
    expect(coinut.getAssets).to.be.a('function');
  });

  it('should return an array of Asset Types', () => {
    return expect(assetsP).to.eventually.deep.equal(mockResponseData);
  });
});

});
