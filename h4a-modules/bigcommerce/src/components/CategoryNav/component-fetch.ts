import { IPluginComponentFetch } from '@h4a/core/interface/plugin-interface';
import getApolloClient from '@h4a/core/service/get-apollo-client';
import { QUERY_CATEGORY_TREE } from '@h4a/bigcommerce/graphql/gql/query-category-tree';

const categoryNavComponentFetch: IPluginComponentFetch = async (
    area,
    ctx,
    pageProps,
    componentProps
) => {
    await getApolloClient('@h4a/bigcommerce', ctx).query({
        query: QUERY_CATEGORY_TREE,
    });
};

export default categoryNavComponentFetch;
