const Maybe = require('crocks/Maybe');
const safe = require('crocks/Maybe/safe');
const isNumber = require('crocks/predicates/isNumber');
const pipe = require('crocks/helpers/pipe');

const safeNumber = safe(isNumber);


const exp = (errorBuilder) => {
  const validationChainCreator = maybeValue => (...validators) => {
    const isValid = validators.reduce(
      (res, validator) => res && maybeValue.map(validator).option(false),
      true,
    );
    const result = isValid ? maybeValue : Maybe.Nothing();
    return {
      value: () => result.either(errorBuilder, x => x),
    };
  };
  return (value) => {
    const coehercer = {
      toNumber: () => {
        const number = safeNumber(value * 1);
        return {
          validate: validationChainCreator(number),
          value: () => number.either(errorBuilder, x => x),
        };
      },
    };

    return coehercer;
  };
};

const validators = {
  moreThan: v => x => x > v,
  moreThanEqual: v => x => x >= v,
  multipleOf: v => x => x % v === 0,
};

module.exports = exp;


const defaultErrorBuilder = () => new Error('Value is not in the correct format');
const numberCoehercer = exp(defaultErrorBuilder);

console.log(numberCoehercer('15')
  .toNumber()
  .validate(
    validators.moreThan(1),
    validators.multipleOf(3),
  )
  .value());
