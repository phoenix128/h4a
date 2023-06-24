const fs = require('fs');
const assertCoreExists = require('./assert-core-exists');
const prettier = require('prettier');

/**
 * Generates a file that contains a list of all modules
 * @param {any[]} modules
 */
const generateModulesListFile = (modules) => {
    assertCoreExists(modules);
    const generatedPath = `${modules['@h4a/core']}/src/generated`;
    const moduleNames = Object.keys(modules).filter(
        (name) => name !== '@h4a/core'
    );
    moduleNames.push('@h4a/core'); // Must be the last one

    const content = `
      const modules = ${JSON.stringify(moduleNames)};
      export default modules;
  `;

    fs.writeFileSync(
        generatedPath + '/modules.ts',
        prettier.format(content, { parser: 'typescript' })
    );
};

module.exports = generateModulesListFile;
