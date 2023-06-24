import {
    IDynamicComponent,
    ITemplate,
} from '@h4a/core/interface/template-interface';
import { INextPageRouterProps } from '@h4a/core/interface/next-interface';
import { IPluginPageContext } from '@h4a/core/interface/plugin-interface';
import componentsFetchPluginRequire from '@h4a/core/generated/plugin-components-fetch';

/**
 * Load components context recursively
 * @param area
 * @param components
 * @param pageProps
 * @param context
 */
const componentsFetch = async (
    area: string,
    components: IDynamicComponent[],
    pageProps: INextPageRouterProps,
    context: IPluginPageContext
): Promise<IPluginPageContext> => {
    for (const component of components) {
        const { type, props, components } = component;

        if (typeof type !== 'string') continue;
        const contextLoader = componentsFetchPluginRequire(type);
        if (contextLoader === null) continue;

        await contextLoader(area, context, pageProps, props);
        if (components != null) {
            await componentsFetch(area, components, pageProps, context);
        }
    }

    return context;
};

/**
 * Load page context from template
 * @param area
 * @param template
 * @param pageProps
 * @param initialContext
 */
const pageComponentsFetch = async (
    area: string,
    template: ITemplate,
    pageProps: INextPageRouterProps,
    initialContext: IPluginPageContext
): Promise<IPluginPageContext> => {
    return componentsFetch(
        area,
        template.components,
        pageProps,
        initialContext
    );
};

export default pageComponentsFetch;
