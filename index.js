const coercer = require('./src/coercer');
const { moreThan, multipleOf } = require('./src/validators/numbers');


const defaultErrorBuilder = value => new Error(`Value ${value} (${typeof value}) is not in the correct format`);
const coerce = coercer(defaultErrorBuilder);


// const coerce15 = coerce('15');
// console.log(coerce15
//   .toNumber()
//   .validate(
//     moreThan(1),
//     multipleOf(3),
//   )
//   .value());

// console.log(coerce15
//   .toNumberStrict()
//   .validate(
//     moreThan(1),
//     multipleOf(3),
//   )
//   .value());

// console.log(coerce('Ciao T!')
//   .toString()
//   .validate(x => !!x)
//   .value());

// console.log(coerce(50)
//   .toStringStrict()
//   .validate(x => !!x)
//   .value());

console.log(coerce(null).toBool().value());
console.log(coerce(false).toBool().value());
console.log(coerce('true').toBool().value());
console.log(coerce(true).toBoolStrict().value());
console.log(coerce(false).toBoolStrict().value());
console.log(coerce('true').toBoolStrict().value());

