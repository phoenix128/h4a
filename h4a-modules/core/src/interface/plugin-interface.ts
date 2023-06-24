import React from 'react';
import { INextPageRouterProps } from '@h4a/core/interface/next-interface';

import { ITemplate } from '@h4a/core/interface/template-interface';
import { GraphQLSchema } from 'graphql/type';
import { IComponentSchema } from '@h4a/core/interface/component-interface';
import { NextApiRequest } from 'next';

export type IPluginContextsCollection = React.ComponentType<any>[];
export type IPluginComponentFetchCollection = Record<
    string,
    IPluginComponentFetch
>;
export type IPluginComponentData = {
    component: React.FC<any>;
    schema: IComponentSchema;
};

export type IPluginComponentsCollection = Record<string, IPluginComponentData>;

export type IPluginRouter = (
    pageProps: INextPageRouterProps,
    context: IPluginPageContext
) => Promise<IPluginPageResponse | null>;

export type IPluginApiRouter = (
    req: NextApiRequest,
    path: string
) => Promise<[any, ResponseInit] | null>;

export type IPluginContextProcessor = (
    context: IPluginContext
) => Promise<void>;

export type IPluginContext = Record<string, any> & {
    area: string;
    graphqlBasePath: string;
    apiBasePath: string;
    cookies: Record<string, string>;
    clientCacheKey: any; // different cache keys create different apollo clients (use with care)
    responseHeaders?: Record<string, string>;
};

export type IPluginPageContext = IPluginContext & {
    isReady: boolean; // context is provisioned
    baseUrl: string; // http://mydomain.com/area1/
    basePath: string; // /area1/
    pageProps: INextPageRouterProps; // page props
    pageUri: string; // /area1/page1
    apolloState: Record<string, any>; // apollo cache state from server
};

export interface IPluginPageResponse {
    template: ITemplate;
    context?: Partial<IPluginPageContext>;
}

export type IPluginComponentFetch = (
    area: string,
    ctx: IPluginPageContext,
    pageProps: INextPageRouterProps,
    componentProps: any
) => Promise<void>;

export type IPluginGraphQl = () => Promise<GraphQLSchema>;
