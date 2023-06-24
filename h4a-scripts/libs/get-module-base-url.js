const path = require("path");

/**
 * Returns the base url of a module
 * @param {string} modulePath
 * @returns {string}
 */
const getModuleBaseUrl = (modulePath) => {
  const tsconfigPath = path.join(modulePath, "tsconfig.json");
  const tsConfig = require(tsconfigPath);
  return tsConfig.compilerOptions.baseUrl;
}

module.exports = getModuleBaseUrl;
