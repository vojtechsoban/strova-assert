import chai, {expect} from 'chai';
import strovaAssert, {max} from '../index';
import {logError} from '../actions';
import sinon from 'sinon'
import sinonChai from 'sinon-chai';
import {MAX} from "../messages";

chai.use(sinonChai);

describe('testing max', () => {
let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(console, 'error');
    strovaAssert.setAction(logError);
  });

  afterEach(() => {
    sandbox.restore();
  });

  const MAX_VALUE = 1000;

  it('return true when passing null argument', () => {
    max(null, MAX_VALUE);
    expect(console.error.calledOnce).to.be.false;
  });
  it('return true when passing undefined argument', () => {
    max(undefined, MAX_VALUE);
    expect(console.error.calledOnce).to.be.false;
  });
  it(`return true when comparing ${MAX_VALUE-1} and ${MAX_VALUE}`, () => {
    max(MAX_VALUE - 1, MAX_VALUE);
    expect(console.error.calledOnce).to.be.false;
  });
  it(`return true when comparing ${MAX_VALUE} and ${MAX_VALUE}`, () => {
    max(MAX_VALUE, MAX_VALUE);
    expect(console.error.calledOnce).to.be.false;
  });
  it(`return false when comparing ${MAX_VALUE + 1} and ${MAX_VALUE}`, () => {
    max(MAX_VALUE + 1, MAX_VALUE);
    expect(console.error).to.be.calledWith(MAX);
  });
});
