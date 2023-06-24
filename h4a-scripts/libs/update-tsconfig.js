const path = require('path');
const prettier = require('prettier');
const { writeFileSync } = require('fs');

const getRelativeResolvingPath = (baseUrlModulePath, otherModulePath) => {
    const otherModuleTsconfigPath = path.resolve(
        path.join(otherModulePath, 'tsconfig.json')
    );

    if (!require('fs').existsSync(otherModuleTsconfigPath)) return null;
    const otherModuleTsconfig = require(otherModuleTsconfigPath);

    const {
        compilerOptions: { baseUrl: otherModuleBaseUrl },
    } = otherModuleTsconfig;

    const relativePath = path
        .relative(baseUrlModulePath, otherModulePath)
        .replace(/\\/g, '/');
    return `${relativePath}/${otherModuleBaseUrl}`;
};

/**
 * Updates the tsconfig.json file to add the path mapping for each module
 * @param {any[]} apps
 * @param {any[]} modules
 * @param {any[]} packages
 * @param {any[]} rewriteModules
 */
const updateTsConfig = (modules, apps, packages, rewriteModules) => {
    // Fetch all tsconfig files
    const tsConfigPaths = [];

    for (const modulePath of Object.values(modules)) {
        tsConfigPaths.push(path.join(modulePath, 'tsconfig.json'));
    }

    for (const modulePath of Object.values(rewriteModules)) {
        tsConfigPaths.push(path.join(modulePath, 'tsconfig.json'));
    }

    for (const appBasePath of Object.values(apps)) {
        tsConfigPaths.push(path.join(appBasePath, 'tsconfig.json'));
    }

    for (const packageBasePath of Object.values(packages)) {
        // Check if tsconfig.json exists
        const tsconfigPath = path.join(packageBasePath, 'tsconfig.json');
        if (!require('fs').existsSync(tsconfigPath)) continue;
        tsConfigPaths.push(path.join(packageBasePath, 'tsconfig.json'));
    }

    // Map overwrite modules with the original modules depending on package.json configuration
    const overwriteModulesMap = {};
    for (const [moduleName, modulePath] of Object.entries(rewriteModules)) {
        const { h4aRewrite } = require(path.join(modulePath, 'package.json'));
        if (!h4aRewrite) {
            throw new Error(
                `The module ${moduleName} is not configured to overwrite any module. Please add the h4aRewrite property in the package.json file.`
            );
        }

        overwriteModulesMap[h4aRewrite] = moduleName;
    }

    // Set paths for each tsconfig file
    for (const tsconfigPath of tsConfigPaths) {
        const tsconfig = require(tsconfigPath);
        const {
            compilerOptions: { baseUrl },
        } = tsconfig;
        const modulePath = path.dirname(tsconfigPath);
        const baseUrlModulePath = path.resolve(path.join(modulePath, baseUrl));

        const compilerOptionsPath = {};
        const modulesAndPackages = { ...modules, ...packages };

        for (const [otherModuleName, otherModulePath] of Object.entries(
            modulesAndPackages
        )) {
            const resolvingPaths = [];

            if (overwriteModulesMap[otherModuleName]) {
                const rewritingPath =
                    rewriteModules[overwriteModulesMap[otherModuleName]];
                resolvingPaths.push(
                    getRelativeResolvingPath(baseUrlModulePath, rewritingPath) +
                        '/*'
                );

                compilerOptionsPath[`${otherModuleName}-source/*`] = [
                    getRelativeResolvingPath(
                        baseUrlModulePath,
                        otherModulePath
                    ) + '/*',
                ];
            }

            const p = getRelativeResolvingPath(
                baseUrlModulePath,
                otherModulePath
            );
            if (p) {
                resolvingPaths.push(
                    getRelativeResolvingPath(
                        baseUrlModulePath,
                        otherModulePath
                    ) + '/*'
                );
                compilerOptionsPath[`${otherModuleName}/*`] = resolvingPaths;
            }
        }

        if (!tsconfig.compilerOptions) {
            tsconfig.compilerOptions = {};
        }
        tsconfig.compilerOptions.paths = compilerOptionsPath;

        writeFileSync(
            tsconfigPath,
            prettier.format(JSON.stringify(tsconfig), { parser: 'json' })
        );
    }
};

module.exports = updateTsConfig;
