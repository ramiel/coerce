import localResolve from 'rollup-plugin-local-resolve';

export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    localResolve(),
  ],
  external: [
    'crocks/Maybe',
    'crocks/Maybe/safe',
    'crocks/predicates/isNumber',
    'crocks/predicates/isString',
  ],
};
