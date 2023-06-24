const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Converts a string to camel case
 * @param {string} s
 * @returns {*|string}
 */
const camelize = (s) => {
  if (typeof s === 'string') {
    return s.replace(/-./g, x => x[1].toUpperCase());
  }

  return camelize(s.map((t, i) => i === 0 ? t : capitalize(t)).join(''));
}
module.exports = camelize;
