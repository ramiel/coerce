module.exports = {
  enum: (accept = []) => x => accept.indexOf(x) !== -1,
  match: regexp => x => regexp.test(x),
};
