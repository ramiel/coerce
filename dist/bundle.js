'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Maybe = _interopDefault(require('crocks/Maybe'));
var safe = _interopDefault(require('crocks/Maybe/safe'));
var isNumber = _interopDefault(require('crocks/predicates/isNumber'));
var isString = _interopDefault(require('crocks/predicates/isString'));

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

function moreThan(v) { return x => x > v; }
function multipleOf(v) { return x => x % v === 0; }

const defaultErrorBuilder = value => new Error(`Value ${value} (${typeof value}) is not in the correct format`);
const coehercer$1 = coehercer(defaultErrorBuilder);

console.log(coehercer$1('15')
  .toNumber()
  .validate(
    moreThan(1),
    multipleOf(3),
  )
  .value());

console.log(coehercer$1('Ciao T!')
  .toString()
  .validate(x => !!x)
  .value());

console.log(coehercer$1(50)
  .toStringStrict()
  .validate(x => !!x)
  .value());

console.log(coehercer$1('15')
  .toNumberStrict()
  .validate(
    moreThan(1),
    multipleOf(3),
  )
  .value());
