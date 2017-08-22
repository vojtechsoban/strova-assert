import chai, {expect} from 'chai';
import strovaAssert, {min} from '../index';
import {logError} from '../actions';
import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import {MIN} from "../messages";

chai.use(sinonChai);

describe('testing min', () => {
let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(console, 'error');
    strovaAssert.setAction(logError);
  });

  afterEach(() => {
    sandbox.restore();
  });

  const MIN_VALUE = 1000;

  it('return true when passing null argument', () => {
    min(null, MIN_VALUE);
    expect(console.error.calledOnce).to.be.false;
  });
  it('return true when passing undefined argument', () => {
    min(undefined, MIN_VALUE);
    expect(console.error.calledOnce).to.be.false;
  });
  it(`return true when comparing ${MIN_VALUE + 1} and ${MIN_VALUE}`, () => {
    min(MIN_VALUE + 1, MIN_VALUE);
    expect(console.error.calledOnce).to.be.false;
  });
  it(`return true when comparing ${MIN_VALUE} and ${MIN_VALUE}`, () => {
    min(MIN_VALUE, MIN_VALUE);
    expect(console.error.calledOnce).to.be.false;
  });
  it(`return false when comparing ${MIN_VALUE - 1} and ${MIN_VALUE}`, () => {
    min(MIN_VALUE - 1, MIN_VALUE);
    expect(console.error).to.be.calledWith(MIN);
  });
});
