import coehercer from './src/coehercer';
import { moreThan, multipleOf } from './src/validators/numbers';


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

