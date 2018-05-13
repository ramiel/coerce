const coherecerBuilder = require('./src/coehercer');
const { moreThan, multipleOf } = require('./src/validators/numbers');


const defaultErrorBuilder = value => new Error(`Value ${value} (${typeof value}) is not in the correct format`);
const coehercer = coherecerBuilder(defaultErrorBuilder);

console.log(coehercer('15')
  .toNumber()
  .validate(
    moreThan(1),
    multipleOf(3),
  )
  .value());

console.log(coehercer('Ciao T!')
  .toString()
  .validate(x => !!x)
  .value());

console.log(coehercer(50)
  .toStringStrict()
  .validate(x => !!x)
  .value());

console.log(coehercer('15')
  .toNumberStrict()
  .validate(
    moreThan(1),
    multipleOf(3),
  )
  .value());

