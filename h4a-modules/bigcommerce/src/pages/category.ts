import getTemplate from '@h4a/core/libs/get-template-by-name';
import { IResourcePageRouterInterface } from '@h4a/bigcommerce/interface/page-router-interface';
import getApolloClient from '@h4a/core/service/get-apollo-client';
import { QUERY_PRODUCT } from '@h4a/bigcommerce/graphql/gql/query-product';
import { IPluginContext } from '@h4a/core/interface/plugin-interface';

const loadProductsCache = (items: any[], context: IPluginContext) => {
    const client = getApolloClient('@h4a/bigcommerce', context);

    // Forge products query
    for (const product of items) {
        client.cache.writeQuery({
            query: QUERY_PRODUCT,
            variables: {
                entityId: product.entityId,
            },
            data: {
                site: {
                    product,
                },
            },
        });
    }
};

const categoryRouter: IResourcePageRouterInterface = async (
    resource,
    pageProps,
    context
) => {
    const categoryProducts = resource.paginatedProducts;

    const { items, ...pagination } = categoryProducts;
    loadProductsCache(items, context);

    return {
        template: await getTemplate('category'),
        context: {
            pageTitle: resource.name,
            products: items,
            pagination,
            category: resource,
        },
    };
};

export default categoryRouter;
