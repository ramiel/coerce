const curry = require('crocks/helpers/curry');

const or = (fna, fnb) => v => fna(v) || fnb(v);
module.exports = curry(or);
