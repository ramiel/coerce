import Maybe from 'crocks/Maybe';
import safe from 'crocks/Maybe/safe';
import isNumber from 'crocks/predicates/isNumber';
import isString from 'crocks/predicates/isString';

const safeNumber = safe(isNumber);
const safeString = safe(isString);


export default function coehercer(errorBuilder) {
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

  const defaultReturnCreator = v => ({
    validate: validationChainCreator(v),
    value: () => v.either(errorBuilder, x => x),
  });

  return {
    toNumber: value => defaultReturnCreator(safeNumber(value * 1)),
    toNumberStrict: value => defaultReturnCreator(safeNumber(value)),
    toString: value => defaultReturnCreator(safeString(`${value}`)),
    toStringStrict: value => defaultReturnCreator(safeString(value)),
  };
}
