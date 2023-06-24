const path = require('path');
const prettier = require('prettier');
const fs = require('fs');
const assertCoreExists = require('./assert-core-exists');
const getModuleBaseUrl = require('./get-module-base-url');

/**
 * Generates a file that imports all the styles from the modules
 * @param {any[]} modules
 * @param {string} fileName
 */
const generateStylesAggregator = (modules, fileName) => {
    assertCoreExists(modules);
    const generatedPath = `${modules['@h4a/core']}/src/generated`;

    const blocks = [
        "@import 'tailwindcss/base';",
        "@import 'tailwindcss/components';",
        "@import 'tailwindcss/utilities';",
    ];

    for (const [moduleName, modulePath] of Object.entries(modules)) {
        const baseUrl = getModuleBaseUrl(modulePath);

        if (
            !fs.existsSync(
                path.join(modulePath, baseUrl, 'plugin', '_module.css')
            )
        )
            continue;

        if (baseUrl === '.') {
            blocks.push(`@import "${moduleName}/plugin/_module.css";`);
        } else {
            blocks.push(
                `@import "${moduleName}/${baseUrl}/plugin/_module.css";`
            );
        }
    }

    const content = blocks.join('\n');
    fs.writeFileSync(
        `${generatedPath}/${fileName}`,
        prettier.format(content, { parser: 'css' })
    );
};

module.exports = generateStylesAggregator;
