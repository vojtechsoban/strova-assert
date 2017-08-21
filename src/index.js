import * as validation from 'strova-validation';
import * as msg from './messages';
import {logError, throwError} from "./actions";

const config = {
  defaultAction: process.env.NODE_ENV === 'production' ? logError : throwError
};

const setAction = action => {
  config.defaultAction = action
};

const actionOrDefault = action => message => (action ? action : config.defaultAction)(message);

export const isNull = (arg, message = msg.IS_NULL, action = null) => {
  if (!validation.isNull(arg)) {
    actionOrDefault(action)(message);
  }
};

export const notNull = (arg, message = msg.NOT_NULL, action = null) => {
  if (!validation.notNull(arg)) {
    actionOrDefault(action)(message);
  }
};

export const isEmpty = (arg, message = msg.IS_EMPTY, action = null) => {
  if (!validation.isEmpty(arg)) {
    actionOrDefault(action)(message);
  }
};

export const notEmpty = (arg, message = msg.NOT_EMPTY, action = null) => {
  if (!validation.notEmpty(arg)) {
    actionOrDefault(action)(message);
  }
};

export const isBlank = (arg, message = msg.IS_BLANK, action = null) => {
  if (!validation.isBlank(arg)) {
    actionOrDefault(action)(message);
  }
};

export const notBlank = (arg, message = msg.NOT_BLANK, action = null) => {
  if (!validation.notBlank(arg)) {
    actionOrDefault(action)(message);
  }
};

export const isNumber = (arg, message = msg.IS_NUMBER, action = null) => {
  if (!validation.isNumber(arg)) {
    actionOrDefault(action)(message);
  }
};

export const isInteger = (arg, message = msg.IS_INTEGER, action = null) => {
  if (!validation.isInteger(arg)) {
    actionOrDefault(action)(message);
  }
};

export const min = (arg, min, message = msg.MIN, action = null) => {
  if (!validation.min(arg, min)) {
    actionOrDefault(action)(message);
  }
};

export const max = (arg, max, message = msg.MAX, action = null) => {
  if (!validation.max(arg, max)) {
    actionOrDefault(action)(message);
  }
};

export default {
  isNull, notNull,
  isEmpty, notEmpty,
  isBlank, notBlank,
  isNumber, isInteger,
  min, max,
  setAction
}
