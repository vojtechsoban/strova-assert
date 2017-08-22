import * as validation from 'strova-validation';
import * as msg from './messages';
import {logError, throwError} from './actions';
import * as actions from './actions';

const globalConfig = {
  defaultAction: process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production' ?
    logError : throwError
};

const setAction = action => {
  globalConfig.defaultAction = action
};

const isNullable = (expression, config) => (config.nullable && isNull(expression));

const actionOrDefault = action => message => (action ? action : globalConfig.defaultAction)(message);

const execute = (fn, expression, config = {}, defaultMessage = msg.DEFAULT) => {
  let message;
  if (typeof config === 'string') {
    message = config;
    config = {};
  } else if (config.message) {
    message = config.message;
  } else {
    message = defaultMessage;
  }

  if (!fn(expression)) {
    (config.action ? config.action : globalConfig.defaultAction)(message);
  }
};

export const isNull = (arg, message = msg.IS_NULL, config = {}) => {
  execute(validation.isNull, arg, configOrMessage, msg.IS_NULL);
};

export const notNull = (arg, configOrMessage) => {
  execute(validation.notNull, arg, configOrMessage, msg.NOT_NULL);
};

export const isEmpty = (arg, configOrMessage) => {
  execute(validation.isEmpty, arg, configOrMessage, msg.IS_EMPTY);
};

export const notEmpty = (arg, configOrMessage) => {
  execute(validation.notEmpty, arg, configOrMessage, msg.NOT_EMPTY);
};

export const isBlank = (arg, configOrMessage) => {
  execute(validation.isBlank, arg, configOrMessage, msg.IS_BLANK);
};

export const notBlank = (arg, configOrMessage) => {
  execute(validation.notBlank, arg, configOrMessage, msg.NOT_BLANK);
};

export const isNumber = (arg, configOrMessage) => {
  execute(validation.isNumber, arg, configOrMessage, msg.IS_NUMBER);
};

export const isInteger = (arg, configOrMessage) => {
  execute(validation.isInteger, arg, configOrMessage, msg.IS_INTEGER);
};

export const min = (arg, limit, configOrMessage) => {
  execute(arg => validation.min(arg, limit), arg, configOrMessage, msg.MIN);
};

export const max = (arg, limit, configOrMessage) => {
  execute(arg => validation.max(arg, limit), arg, configOrMessage, msg.MAX);
};

export default {
  isNull, notNull,
  isEmpty, notEmpty,
  isBlank, notBlank,
  isNumber, isInteger,
  min, max,
  setAction, actions
}
