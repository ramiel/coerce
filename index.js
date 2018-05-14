const coercer = require('./coercer');
const { moreThan, multipleOf, divisorOf } = require('./validators/numbers');
const { match } = require('./validators/strings');
const oneOf = require('./validators/strings/oneOf');
const not = require('./helpers/not');
const or = require('./helpers/or');

const defaultErrorBuilder = value => `Value ${value} (${typeof value}) is not in the correct format`;
const coerce = coercer(defaultErrorBuilder);


const coerce15 = coerce('15');
console.log(coerce15
  .toNumber()
  .validate(
    moreThan(1),
    multipleOf(3),
  )
  .value());

console.log(coerce15
  .toNumberStrict()
  .validate(
    () => {
      console.log('Im not called at all');
      return true;
    },
    moreThan(1),
    multipleOf(3),
  )
  .value());

console.log(coerce('Ciao T!')
  .toString()
  .validate(x => !!x)
  .value());

console.log(coerce(50)
  .toStringStrict()
  .validate(x => !!x)
  .value());

console.log(coerce(null).toBool().value());
console.log(coerce(false).toBool().value());
console.log(coerce('true').toBool().value());
console.log(coerce(true).toBoolStrict().value());
console.log(coerce(false).toBoolStrict().value());
console.log(coerce('true').toBoolStrict().value());

console.log(coerce('c')
  .toString()
  .validate(not(oneOf(['b'])))
  .value());

console.log(coerce('ciao')
  .toString()
  .validate(or(oneOf(['b']), match(/ciao/)))
  .value());

console.log(coerce(3)
  .toNumber()
  .validate(divisorOf(9))
  .value());

