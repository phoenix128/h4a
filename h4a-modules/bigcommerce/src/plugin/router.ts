import {
    IPluginPageContext,
    IPluginRouter,
} from '@h4a/core/interface/plugin-interface';
import categoryRouter from '@h4a/bigcommerce/pages/category';
import loginRouter from '@h4a/bigcommerce/pages/login';
import getApolloClient from '@h4a/core/service/get-apollo-client';
import { QUERY_ROUTE } from '@h4a/bigcommerce/graphql/gql/query-route';
import productRouter from '@h4a/bigcommerce/pages/product';

const getRoute = async (path: string[], context: IPluginPageContext) => {
    const client = getApolloClient('@h4a/bigcommerce', context);
    try {
        const res = await client.query({
            query: QUERY_ROUTE,
            variables: {
                path: '/' + path.join('/'),
                page: parseInt(
                    (context.pageProps.searchParams['page'] as string) || '1',
                    10
                ),
                limit: parseInt(
                    (context.pageProps.searchParams['limit'] as string) || '8',
                    10
                ),
            },
            context,
        });

        return res.data.site.route.node;
    } catch (e) {
        console.error(JSON.stringify(e));
        return null;
    }
};

/**
 * Dynamic resource routing
 * @param pageProps
 * @param context
 */
const resourceRouter: IPluginRouter = async (pageProps, context) => {
    const {
        params: { path },
    } = pageProps;

    const resource = await getRoute(path, context);
    switch (resource?.__typename) {
        case 'Product':
            return productRouter(resource, pageProps, context);
        case 'Category':
            return categoryRouter(resource, pageProps, context);
    }

    return null;
};

/**
 * Static pages routing
 * @param pageProps
 * @param context
 */
const staticRouter: IPluginRouter = async (pageProps, context) => {
    const {
        params: { path },
    } = pageProps;

    const fullPath = path.join('/');

    switch (fullPath) {
        case 'login':
            return loginRouter(pageProps, context);
    }

    return null;
};

const router: IPluginRouter = async (pageProps, context) => {
    const staticRoute = await staticRouter(pageProps, context);
    if (staticRoute) {
        return staticRoute;
    }

    return resourceRouter(pageProps, context);
};

export default router;
