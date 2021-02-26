module.exports = {
  currentUser: {},
  parse2Plain: (object) => {
    if (!object) return null;

    return JSON.parse(JSON.stringify(object));
  },
  padLeadingZero: (num, size) => {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  },
};
