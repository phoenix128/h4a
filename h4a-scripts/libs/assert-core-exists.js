/**
 * Make sure the core module exists
 * @param {any[]} modules
 */
const assertCoreExists = (modules) => {
  if (!modules["@h4a/core"]) {
    throw new Error(`@h4a/core is missing, please add it to h4a-modules`);
  }
};

module.exports = assertCoreExists;
