import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    OperationVariables,
} from '@apollo/client';
import { ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { DocumentNode } from 'graphql/language';
import getAreaConfig from '@h4a/core/libs/get-area-config';
import { IPluginContext } from '@h4a/core/interface/plugin-interface';

const clients: Record<string, ApolloClient<any>> = {};

const getBigCommerceClient = (area: string, customerGroupId: number) => {
    // Avoid cache overlapping across different groups/areas
    const clientKey = `${area}:${customerGroupId}`;

    if (area === undefined) throw new Error('Area is undefined');

    if (!clients.hasOwnProperty(clientKey)) {
        console.log(
            'Creating new BigCommerce client for',
            area,
            customerGroupId
        );
        const config = getAreaConfig(area);

        // Forward response headers to Apollo response
        const responseHeadersLink = new ApolloLink((operation, forward) => {
            return forward(operation).map((response) => {
                const { response: httpResponse } = operation.getContext();
                const responseHeaders = httpResponse && httpResponse.headers;

                if (responseHeaders) {
                    (response as any)!.headers = responseHeaders;
                }

                return response;
            });
        });

        // Send authentication token
        const authLink = setContext((_, { headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${config.bigcommerce.storefrontToken}`,
                },
            };
        });

        const bigCommerceLink = createHttpLink({
            uri: config.bigcommerce.graphqlEndpoint,
        });

        clients[clientKey] = new ApolloClient({
            link: responseHeadersLink.concat(authLink).concat(bigCommerceLink),
            cache: new InMemoryCache({
                typePolicies: {
                    Query: {
                        fields: {
                            site: {
                                merge(existing, incoming) {
                                    return { ...existing, ...incoming };
                                },
                            },
                        },
                    },
                },
            }),
        });
    }

    return clients[clientKey];
};

const getHeaders = (shopToken: string | undefined) => {
    if (!shopToken) {
        return {};
    }

    return {
        Cookie: `SHOP_TOKEN=${shopToken}`,
    };
};

/**
 * Send a GraphQL request to the BigCommerce API
 * @param query
 * @param variables
 * @param context
 */
export const query = async (
    query: DocumentNode,
    variables: OperationVariables,
    context: IPluginContext
) => {
    const { area, bigcommerce } = context;
    const {
        customerData: { customerGroupId, shopToken },
    } = bigcommerce;

    const client = getBigCommerceClient(area, customerGroupId);
    const headers = getHeaders(shopToken);

    const res = await client.query({
        query,
        variables,
        context: {
            headers,
        },
    });

    if (res.errors) {
        console.error(res.errors);
    }

    return {
        data: res.data,
        headers: (res as any).headers,
        errors: res.errors,
    };
};

export const mutation = async (
    mutation: DocumentNode,
    variables: OperationVariables,
    context: IPluginContext
) => {
    const { area, bigcommerce } = context;
    const {
        customerData: { customerGroupId, shopToken },
    } = bigcommerce;

    const client = getBigCommerceClient(area, customerGroupId);
    const headers = getHeaders(shopToken);

    const res = await client.mutate({
        mutation,
        variables,
        context: {
            headers,
        },
    });

    if (res.errors) {
        console.error(res.errors);
    }

    return {
        data: res.data,
        headers: (res as any).headers,
        errors: res.errors,
    };
};
