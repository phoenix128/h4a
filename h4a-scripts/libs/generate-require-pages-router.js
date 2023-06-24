const assertCoreExists = require('./assert-core-exists');
const path = require('path');
const prettier = require('prettier');
const fs = require('fs');
const camelize = require('./camelize');

/**
 * Generates a file that contains a switch case for each module.
 * An explicit require for each router is required by Next.js
 * @param {any[]} modules
 * @param {string} fileName
 */
const generateRequirePagesRouter = (modules, fileName) => {
    assertCoreExists(modules);
    const generatedPath = `${modules['@h4a/core']}/src/generated`;

    const switchCasesCode = [];
    const imports = [];

    for (const [moduleName, modulePath] of Object.entries(modules)) {
        if (!fs.existsSync(path.join(modulePath, 'src', 'plugin', 'router.ts')))
            continue;

        const routerName = camelize([path.basename(modulePath), 'Router']);
        imports.push(
            `import ${routerName} from "${moduleName}/plugin/router";`
        );

        switchCasesCode.push(`case "${moduleName}": return ${routerName};`);
    }

    const switchCode =
        switchCasesCode.length === 0
            ? ''
            : `
    switch (module) {
      ${switchCasesCode.join('\n')}
    }`;

    const content = ` 
    import { IPluginRouter } from "@h4a/core/interface/plugin-interface";
    ${imports.join('\n')}
  
    const requireRouter = (module: string): IPluginRouter | null => {     
      ${switchCode}
    
      return null;
    }
    
    export default requireRouter;
  `;

    fs.writeFileSync(
        `${generatedPath}/${fileName}`,
        prettier.format(content, { parser: 'typescript' })
    );
};

module.exports = generateRequirePagesRouter;
