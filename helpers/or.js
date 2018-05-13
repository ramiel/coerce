module.exports = (fna, fnb) => v => fna(v) || fnb(v);
