"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var logInfo = exports.logInfo = function logInfo(msg) {
  console.log(msg);
};

var logWarn = exports.logWarn = function logWarn(msg) {
  console.warn(msg);
};

var logError = exports.logError = function logError(msg) {
  console.error(msg);
};

var throwError = exports.throwError = function throwError(msg) {
  throw new Error(msg);
};