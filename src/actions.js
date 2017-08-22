export const logInfo = msg => {
  console.log(msg);
};

export const logWarn = msg => {
  console.warn(msg);
};

export const logError = msg => {
  console.error(msg);
};

export const throwError = msg => {
  throw new Error(msg);
};

export const noop = () => {};
