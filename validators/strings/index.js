module.exports = {
  oneOf: (accept = []) => x => accept.indexOf(x) !== -1,
  match: regexp => x => regexp.test(x),
};
