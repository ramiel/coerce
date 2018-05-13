'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Maybe = _interopDefault(require('crocks/Maybe'));
var safe = _interopDefault(require('crocks/Maybe/safe'));
var isNumber = _interopDefault(require('crocks/predicates/isNumber'));
var isString = _interopDefault(require('crocks/predicates/isString'));

const safeNumber = safe(isNumber);
const safeString = safe(isString);


function coehercer(errorBuilder) {
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

function moreThan(v) { return x => x > v; }
function multipleOf(v) { return x => x % v === 0; }

const defaultErrorBuilder = value => new Error(`Value ${value} is not in the correct format`);
const {
  toNumber, toNumberStrict, toString, toStringStrict,
} = coehercer(defaultErrorBuilder);

// console.log(toNumber('15')
//   .validate(
//     moreThan(1),
//     multipleOf(3),
//   )
//   .value());

// console.log(toString('Ciao T!')
//   .validate(x => !!x)
//   .value());

// console.log(toStringStrict(50)
//   .validate(x => !!x)
//   .value());

console.log(toNumberStrict('15')
  .validate(
    moreThan(1),
    multipleOf(3),
  )
  .value());
