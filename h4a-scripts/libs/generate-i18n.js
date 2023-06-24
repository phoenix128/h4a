const assertCoreExists = require('./assert-core-exists');
const getModuleBaseUrl = require('./get-module-base-url');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const prettier = require('prettier');
/**
 * Generate a translations file with all the translations from the modules
 * @param modules
 * @param fileName
 */
const generateI18n = (modules, fileName) => {
    assertCoreExists(modules);
    const generatedPath = `${modules['@h4a/core']}/src/generated`;

    let translations = {};
    for (const modulePath of Object.values(modules)) {
        const relativeBaseUrlPath = getModuleBaseUrl(modulePath);
        const moduleBaseUrl = path.join(modulePath, relativeBaseUrlPath);
        const translationsPath = path.join(moduleBaseUrl, 'plugin', 'i18n');

        if (!fs.existsSync(translationsPath)) continue;

        const translationFiles = fs
            .readdirSync(translationsPath, { withFileTypes: true })
            .filter(
                (dirent) => dirent.isFile() && dirent.name.endsWith('.json')
            )
            .map((dirent) => dirent.name);

        for (const translationFile of translationFiles) {
            const locale = translationFile.replace('.json', '');

            const moduleTranslations = {};
            moduleTranslations[locale] = JSON.parse(
                fs.readFileSync(
                    path.join(translationsPath, translationFile),
                    'utf8'
                )
            );
            translations = _.merge(translations, moduleTranslations);
        }
    }

    const content = `
    export default ${JSON.stringify(translations)};
  `;

    fs.writeFileSync(
        `${generatedPath}/${fileName}`,
        prettier.format(content, { parser: 'typescript' })
    );
};

module.exports = generateI18n;
