import chai, {expect} from 'chai';
import Assert, {notEmpty} from '../index';
import {logError} from '../actions';
import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import {NOT_EMPTY} from "../messages";

chai.use(sinonChai);

describe('Assert notEmpty', () => {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(console, 'error');
    Assert.setAction(logError)
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('for null argument', () => {
    it('should log info with default message', () => {
      notEmpty(null);
      expect(console.error).to.have.been.calledWith(NOT_EMPTY);
    });

    it('should log error with default message', () => {
      notEmpty(null, undefined, logError);
      expect(console.error).to.have.been.calledWith(NOT_EMPTY);
    });

    it('should log info with custom message', () => {
      notEmpty(null, 'Custom message');
      expect(console.error).to.have.been.calledWith('Custom message');
    });
  });

  it('should log info for an empty string', () => {
    notEmpty('');
    expect(console.error.calledOnce).to.be.true;
  });

  it('should not log anything for white character', () => {
    notEmpty(' ');
    expect(console.error.calledOnce).to.be.false;
  });

  it('should not log anything for zero', () => {
    notEmpty(0);
    expect(console.error.calledOnce).to.be.false;
  });
});
