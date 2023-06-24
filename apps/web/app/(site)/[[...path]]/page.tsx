import Template from '@h4a/core/components/Template';
import React from 'react';
import { INextPageRouterProps } from '@h4a/core/interface/next-interface';
import runPagesRouter from '@h4a/core/service/run-pages-router';
import pageComponentsFetch from '@h4a/core/service/page-components-fetch';
import { IPluginPageContext } from '@h4a/core/interface/plugin-interface';
import getAreaInfo from '@h4a/core/libs/get-area-info';
import {
    PARAM_COOKIES,
    PARAM_NORMALIZED_URL,
    PARAM_URI,
} from '@h4a/core/libs/map-headers-to-qs';
import getApolloClient from '@h4a/core/service/get-apollo-client';
import deepCopy from '@h4a/core/libs/deep-copy';
import contextProcessor from '@h4a/core/service/context-processor';
import graphqlPluginRequire from '@h4a/core/generated/plugin-graphql';
import modules from '@h4a/core/generated/modules';

/**
 * Transfers the Apollo cache from the server to the client
 * @param context
 */
const loadApolloCache = (context: IPluginPageContext) => {
    for (const moduleName of modules) {
        const def = graphqlPluginRequire(moduleName);
        if (def === null) continue;

        const cache = getApolloClient(moduleName, context).cache.extract();
        context.apolloState[moduleName] = deepCopy(cache);
    }
};

const getContextAndTemplate = async (props: INextPageRouterProps) => {
    const { searchParams } = props;

    const pageUri = searchParams[PARAM_URI] as string;
    const normalizedUrl = searchParams[PARAM_NORMALIZED_URL] as string;

    const {
        name: area,
        baseUrl,
        relativePath,
        graphqlBasePath,
        apiBasePath,
        basePath,
    } = getAreaInfo(normalizedUrl);
    props.params.path = relativePath.split('/');

    const context: IPluginPageContext = {
        isReady: true,
        cookies: JSON.parse(searchParams[PARAM_COOKIES] as string), // Cookies are forwarded by a middleware
        graphqlBasePath,
        apiBasePath,
        area,
        baseUrl,
        basePath,
        pageProps: props,
        pageUri,
        apolloState: {},
        clientCacheKey: {},
    };

    await contextProcessor(context);
    const { template, context: additionalContext } = await runPagesRouter(
        props,
        context
    );
    const fullContext = { ...context, ...additionalContext };
    await pageComponentsFetch(area, template, props, fullContext);

    loadApolloCache(fullContext);

    return {
        template,
        context: fullContext,
    };
};

/**
 * Main entry point for H4a routing
 * @param props
 * @constructor
 */
const H4aRouter = async (props: INextPageRouterProps) => {
    const { template, context } = await getContextAndTemplate(props);
    return <Template template={template} context={context} />;
};

export default H4aRouter;
