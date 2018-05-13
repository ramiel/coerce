'use strict';

var Maybe = require('crocks/Maybe');
var safe = require('crocks/Maybe/safe');
var isNumber = require('crocks/predicates/isNumber');
var isString = require('crocks/predicates/isString');

const safeNumber = safe(isNumber);
const safeString = safe(isString);


function coehercer(errorBuilder) {
  return (value) => {
    const onError = () => errorBuilder(value);

    const validationChainCreator = maybeValue => (...validators) => {
      const isValid = validators.reduce(
        (res, validator) => res && maybeValue.map(validator).option(false),
        true,
      );
      const result = isValid ? maybeValue : Maybe.Nothing();
      return {
        value: () => result.either(onError, x => x),
      };
    };
    const defaultReturnCreator = v => ({
      validate: validationChainCreator(v),
      value: () => v.either(onError, x => x),
    });

    return {
      toNumber: () => defaultReturnCreator(safeNumber(value * 1)),
      toNumberStrict: () => defaultReturnCreator(safeNumber(value)),
      toString: () => defaultReturnCreator(safeString(`${value}`)),
      toStringStrict: () => defaultReturnCreator(safeString(value)),
    };
  };
}

module.exports = coehercer;
