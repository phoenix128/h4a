import getTemplateByName from '@h4a/core/libs/get-template-by-name';
import { IResourcePageRouterInterface } from '@h4a/bigcommerce/interface/page-router-interface';
import { IPluginContext } from '@h4a/core/interface/plugin-interface';
import getApolloClient from '@h4a/core/service/get-apollo-client';
import { QUERY_PRODUCT } from '@h4a/bigcommerce/graphql/gql/query-product';

const loadProductCache = (product: any, context: IPluginContext) => {
    const client = getApolloClient('@h4a/bigcommerce', context);

    // Forge product query
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
};

const productRouter: IResourcePageRouterInterface = async (
    resource,
    pageProps,
    context
) => {
    loadProductCache(resource, context);

    return {
        template: await getTemplateByName('product'),
        context: {
            pageTitle: resource.name,
            product: resource,
        },
    };
};

export default productRouter;
