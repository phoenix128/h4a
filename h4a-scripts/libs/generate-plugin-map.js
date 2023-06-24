const assertCoreExists = require('./assert-core-exists');
const path = require('path');
const fs = require('fs');
const prettier = require('prettier');
const camelize = require('./camelize');
const getModuleBaseUrl = require('./get-module-base-url');

/**
 * Generates a mapping of all modules and their components for entities retrieval
 * @param {any[]} modules
 * @param {string} pluginFile
 * @param {string} pluginType
 * @param {string} returnType
 * @param {string[]} additionalImports
 */
const generatePluginMap = (
    modules,
    pluginFile,
    pluginType,
    returnType,
    additionalImports = []
) => {
    assertCoreExists(modules);
    const generatedPath = `${modules['@h4a/core']}/src/generated`;

    const ifBlocksCode = [];
    const imports = [];

    // Collect all plugins
    for (const [moduleName, modulePath] of Object.entries(modules)) {
        const relativeBaseUrlPath = getModuleBaseUrl(modulePath);
        const moduleBaseUrl = path.join(modulePath, relativeBaseUrlPath);
        const fullPluginFilePath = path.join(
            moduleBaseUrl,
            'plugin',
            `${pluginType}.ts`
        );

        if (!fs.existsSync(fullPluginFilePath)) continue;

        const importName = camelize([path.basename(modulePath)]);

        imports.push(
            `import ${importName} from "${moduleName}/plugin/${pluginType}";`
        );

        ifBlocksCode.push(
            `if (module === "${moduleName}" && ${importName}.hasOwnProperty(type)) return ${importName}[type];`
        );
    }

    const functionName = camelize(`${pluginType}PluginRequire`);

    const content = `
    ${additionalImports.join('\n')}
    ${imports.join('\n')}
  
    const ${functionName} = (componentName: string): ${returnType} | null => {
      const [module, type] = componentName.split(':', 2)
      
      ${ifBlocksCode.join('\n')}
    
      return null;
    }
    
    export default ${functionName};
  `;

    fs.writeFileSync(
        `${generatedPath}/${pluginFile}`,
        prettier.format(content, { parser: 'typescript' })
    );
};

module.exports = generatePluginMap;
