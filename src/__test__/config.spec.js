import chai, {expect} from 'chai';
import Assert, {notBlank} from '../index';
import {logInfo, logWarn, logError, throwError, noop} from '../actions';
import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import {NOT_BLANK} from "../messages";

chai.use(sinonChai);

describe('Well configured library', () => {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    // slightly dangerous since test will not report warnings and errors
    sandbox.stub(console, 'warn');
    sandbox.stub(console, 'error');
    Assert.setAction(logError);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should log info with default message', () => {
    // stub console.log only here otherwise test will produce no output
    sandbox.stub(console, 'log');
    notBlank(' ', {action: logInfo});
    expect(console.log).to.have.been.calledWith(NOT_BLANK);
  });

  it('should log warning with default message', () => {
    notBlank(' ', {action: logWarn});
    expect(console.warn).to.have.been.calledWith(NOT_BLANK);
  });

  it('should log error with default message', () => {
    notBlank(' ', {action: logError});
    expect(console.error).to.have.been.calledWith(NOT_BLANK);
  });

  it('by default, should log error with default message', () => {
    notBlank(' ');
    expect(console.error).to.have.been.calledWith(NOT_BLANK);
  });

  it('should do nothing with noop', () => {
    notBlank(' ', {action: noop});
    expect(console.warn.calledOnce).to.be.false;
    expect(console.error.calledOnce).to.be.false;
  });

  it('should throw Error with default message', () => {
    expect(
      () => notBlank(' ', {action: throwError})
    ).to.throw(NOT_BLANK);
  });

  it('should log error with custom message', () => {
    const message = 'I am blank';
    notBlank(' ', message);
    expect(console.error).to.have.been.calledWith(message);
  });
});
