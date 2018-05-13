module.exports = {
  moreThan: v => x => x > v,
  moreThanEqual: v => x => x >= v,
  multipleOf: v => x => x % v === 0,
};
