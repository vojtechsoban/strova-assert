import chai, {expect} from 'chai';
import Assert, {notBlank} from '../index';
import {logError, throwError} from '../actions';
import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import {NOT_BLANK} from "../messages";

chai.use(sinonChai);

describe('Assert notBlank', () => {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(console, 'error');
    Assert.setAction(logError);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should log error with default message', () => {
    notBlank(' ');
    expect(console.error).to.have.been.calledWith(NOT_BLANK);
  });

  it('should not log error with nullable=true', () => {
    notBlank(' ', {nullable: true});
    expect(console.error).to.have.been.calledWith(NOT_BLANK);
  });

  it('should log error with default message', () => {
    notBlank(' ', logError);
    expect(console.error).to.have.been.calledWith(NOT_BLANK);
  });

  it('should log error with custom message', () => {
    notBlank(' ', 'Custom message');
    expect(console.error).to.have.been.calledWith('Custom message');
  });

  it('should not log anything for not empty non white space', () => {
    notBlank(' a ');
    expect(console.error.calledOnce).to.be.false;
  });

  it('should throw an error', () => {
    Assert.setAction(throwError);
    expect(() => notBlank(' ')).to.throw(NOT_BLANK)
  });
});
