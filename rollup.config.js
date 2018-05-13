import localResolve from 'rollup-plugin-local-resolve';
import pkg from './package.json';

export default [
  {
    input: 'src/coehercer.js',
    output: [
      { file: pkg.main, format: 'cjs', interop: false },
      { file: pkg.module, format: 'es', interop: false },
    ],
    plugins: [
      localResolve(),
    ],
    external: [
      'crocks/Maybe',
      'crocks/Maybe/safe',
      'crocks/predicates/isNumber',
      'crocks/predicates/isString',
    ],
  },
];

// {
//   input: 'index.js',
//   output: {
//     file: 'dist/bundle.js',
//     format: 'cjs',
//   },
//   plugins: [
//     localResolve(),
//   ],
//   external: [
//     'crocks/Maybe',
//     'crocks/Maybe/safe',
//     'crocks/predicates/isNumber',
//     'crocks/predicates/isString',
//   ],
// };
