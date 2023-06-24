import modules from '@h4a/core/generated/modules';
import { INextPageRouterProps } from '@h4a/core/interface/next-interface';
import getTemplateByName from '@h4a/core/libs/get-template-by-name';
import {
    IPluginPageContext,
    IPluginPageResponse,
    IPluginRouter,
} from '@h4a/core/interface/plugin-interface';
import requireRouter from '@h4a/core/generated/plugin-router';

const error404Router: IPluginRouter = async (pageProps, context) => {
    return {
        template: await getTemplateByName('error404'),
    };
};

const runPagesRouter = async (
    pageProps: INextPageRouterProps,
    context: IPluginPageContext
): Promise<IPluginPageResponse> => {
    if (pageProps.params.path === undefined) {
        pageProps.params.path = [];
    }

    for (const moduleName of modules) {
        const moduleRouter = requireRouter(moduleName);
        if (moduleRouter === null) {
            continue;
        }

        const routerRes = await moduleRouter(pageProps, context);
        if (routerRes !== null) {
            return routerRes;
        }
    }

    const fallback = await error404Router(pageProps, context);
    if (fallback !== null) {
        return fallback;
    }

    throw new Error(
        'Missing 404 template file. Please create a template file named "error404.h4a.json" in the "h4a/templates" folder.'
    );
};

export default runPagesRouter;
