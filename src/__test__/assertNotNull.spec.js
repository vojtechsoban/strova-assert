import chai, {expect} from 'chai';
import Assert, {notNull} from '../index';
import {logError} from '../actions';
import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import {NOT_NULL} from "../messages";

chai.use(sinonChai);

describe('Assert notNull', () => {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(console, 'error');
    Assert.setAction(logError)
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should log info with default message', () => {
    notNull(null);
    expect(console.error).to.have.been.calledWith(NOT_NULL);
  });

  it('should log error with default message', () => {
    notNull(null, undefined, logError);
    expect(console.error).to.have.been.calledWith(NOT_NULL);
  });

  it('should log info with custom message', () => {
    notNull(null, 'Custom message');
    expect(console.error).to.have.been.calledWith('Custom message');
  });

  it('should not log anything for an empty string', () => {
    notNull('');
    expect(console.error.calledOnce).to.be.false;
  });

  it('should not log anything for zero', () => {
    notNull(0);
    expect(console.error.calledOnce).to.be.false;
  });
});
