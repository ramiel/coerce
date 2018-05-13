import coehercer from './src/coehercer';
import { moreThan, multipleOf } from './src/validators/numbers';


const defaultErrorBuilder = value => new Error(`Value ${value} (${typeof value}) is not in the correct format`);
const myCoehercer = coehercer(defaultErrorBuilder);

console.log(myCoehercer('15')
  .toNumber()
  .validate(
    moreThan(1),
    multipleOf(3),
  )
  .value());

console.log(myCoehercer('Ciao T!')
  .toString()
  .validate(x => !!x)
  .value());

console.log(myCoehercer(50)
  .toStringStrict()
  .validate(x => !!x)
  .value());

console.log(myCoehercer('15')
  .toNumberStrict()
  .validate(
    moreThan(1),
    multipleOf(3),
  )
  .value());

