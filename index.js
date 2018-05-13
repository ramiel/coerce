const coehercer = require('./src/coehercer');
const validators = require('./src/validators/numbers');


const defaultErrorBuilder = () => new Error('Value is not in the correct format');
const numberCoehercer = coehercer(defaultErrorBuilder);

console.log(numberCoehercer('15')
  .toNumber()
  .validate(
    validators.moreThan(1),
    validators.multipleOf(3),
  )
  .value());

console.log(numberCoehercer('15')
  .toNumberStrict()
  .validate(
    validators.moreThan(1),
    validators.multipleOf(3),
  )
  .value());
