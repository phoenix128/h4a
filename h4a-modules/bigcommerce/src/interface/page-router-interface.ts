import { IResource } from '@h4a/bigcommerce/interface/resource-interface';
import { INextPageRouterProps } from '@h4a/core/interface/next-interface';
import {
    IPluginPageContext,
    IPluginPageResponse,
} from '@h4a/core/interface/plugin-interface';

export type IPageRouterInterface = (
    pageProps: INextPageRouterProps,
    context: IPluginPageContext
) => Promise<IPluginPageResponse>;

export type IResourcePageRouterInterface = (
    resource: IResource,
    pageProps: INextPageRouterProps,
    context: IPluginPageContext
) => Promise<IPluginPageResponse>;
