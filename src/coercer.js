const Maybe = require('crocks/Maybe');
const safe = require('crocks/Maybe/safe');
const isNumber = require('crocks/predicates/isNumber');
const isString = require('crocks/predicates/isString');
const isBool = require('crocks/predicates/isBoolean');
const isInt = require('crocks/predicates/isInteger');

const safeNumber = safe(isNumber);
const safeString = safe(isString);
const safeBool = safe(isBool);
const safeInt = safe(isInt);


module.exports = errorBuilder => (value) => {
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


  const coercers = {
    toNumber: () => defaultReturnCreator(safeNumber(value * 1)),
    toNumberStrict: () => defaultReturnCreator(safeNumber(value)),
    toInt: (base = 10) => defaultReturnCreator(safeInt(parseInt(value, base))),
    toString: () => defaultReturnCreator(safeString(`${value}`)),
    toStringStrict: () => defaultReturnCreator(safeString(value)),
    toBool: (trueValues = ['true', '1'], falseValues = ['false', '0', 'undefined', 'null']) => {
      const stringValue = coercers.toString().value();
      // eslint-disable-next-line no-nested-ternary
      const bool = trueValues.indexOf(stringValue) !== -1
        ? Maybe.of(true)
        : falseValues.indexOf(stringValue) !== -1
          ? Maybe.of(false)
          : Maybe.Nothing();
      return defaultReturnCreator(bool);
    },
    toBoolStrict: () => defaultReturnCreator(safeBool(value)),
    any: () => defaultReturnCreator(Maybe.of(value)),
  };
  return coercers;
};
