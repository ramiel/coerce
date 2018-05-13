const Maybe = require('crocks/Maybe');
const safe = require('crocks/Maybe/safe');
const isNumber = require('crocks/predicates/isNumber');

const safeNumber = safe(isNumber);


module.exports = (errorBuilder) => {
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
      toNumberStrict: () => {
        const number = safeNumber(value);
        return {
          validate: validationChainCreator(number),
          value: () => number.either(errorBuilder, x => x),
        };
      },
    };

    return coehercer;
  };
};
