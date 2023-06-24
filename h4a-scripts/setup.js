const path = require('path');
const getModulesList = require('./libs/get-modules-list');
const updateTsConfig = require('./libs/update-tsconfig');
const generateModulesListFile = require('./libs/generate-modules-list');
const generateRequirePagesRouter = require('./libs/generate-require-pages-router');
const configureModulesJson = require('./libs/generate-modules-json');
const generateStylesAggregator = require('./libs/generate-styles-aggregator');
const generateI18n = require('./libs/generate-i18n');
const generatePluginMap = require('./libs/generate-plugin-map');
const generatePluginList = require('./libs/generate-plugin-list');

/**
 * Configure H4A
 */
const configure = () => {
    console.log('Configuring H4A');

    const REWRITES_BASE_PATH = path.resolve('h4a-rewrites');
    const MODULES_BASE_PATH = path.resolve('h4a-modules');
    const PACKAGES_BASE_PATH = path.resolve('packages');
    const APP_BASE_PATH = path.resolve('apps');

    const modules = getModulesList(MODULES_BASE_PATH);
    const rewriteModules = getModulesList(REWRITES_BASE_PATH);
    const apps = getModulesList(APP_BASE_PATH);
    const packages = getModulesList(PACKAGES_BASE_PATH);

    // Global
    configureModulesJson(modules);

    // Plugins
    generateModulesListFile(modules);
    generateStylesAggregator(modules, 'global.css');
    generateI18n(modules, 'plugin-translations.ts');

    generatePluginMap(modules, 'plugin-api.ts', 'api', 'IPluginApiCall', [
        'import { IPluginApiCall } from "@h4a/core/interface/plugin-interface";',
    ]);
    generatePluginMap(
        modules,
        'plugin-components.ts',
        'components',
        'IPluginComponentData',
        [
            'import { IPluginComponentData } from "@h4a/core/interface/plugin-interface";',
        ]
    );
    generatePluginList(
        modules,
        'plugin-components-by-module.ts',
        'components',
        'IPluginComponentsCollection',
        [
            'import { IPluginComponentsCollection } from "@h4a/core/interface/plugin-interface";',
        ]
    );
    generatePluginMap(
        modules,
        'plugin-context.ts',
        'context',
        'React.Context<any>',
        ['import React from "react";']
    );
    generatePluginMap(modules, 'plugin-router.ts', 'router', 'IPluginRouter', [
        'import { IPluginRouter } from "@h4a/core/interface/plugin-interface";',
    ]);
    generatePluginMap(
        modules,
        'plugin-entities-retrieve.ts',
        'entities-retrieve',
        'IPluginEntityRetrieve',
        [
            'import { IPluginEntityRetrieve } from "@h4a/core/interface/plugin-interface";',
        ]
    );
    generatePluginMap(
        modules,
        'plugin-components-fetch.ts',
        'components-fetch',
        'IPluginComponentFetch',
        [
            'import { IPluginComponentFetch } from "@h4a/core/interface/plugin-interface";',
        ]
    );
    generatePluginList(
        modules,
        'plugin-context.ts',
        'context',
        'React.ComponentType<any>[]',
        ['import React from "react";']
    );
    generatePluginList(
        modules,
        'plugin-graphql.ts',
        'graphql',
        'IPluginGraphQl',
        [
            'import { IPluginGraphQl } from "@h4a/core/interface/plugin-interface";',
        ]
    );
    generatePluginList(modules, 'plugin-api.ts', 'api', 'IPluginApiRouter', [
        'import { IPluginApiRouter } from "@h4a/core/interface/plugin-interface";',
    ]);
    generatePluginList(
        modules,
        'plugin-context-processor.ts',
        'context-processor',
        'IPluginContextProcessor',
        [
            'import { IPluginContextProcessor } from "@h4a/core/interface/plugin-interface";',
        ]
    );

    generateRequirePagesRouter(modules, 'plugin-router.ts');

    // Apps
    updateTsConfig(modules, apps, packages, rewriteModules);
};

configure();
