import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { IPluginContext } from '@h4a/core/interface/plugin-interface';
import deepmerge from 'deepmerge';
import { setContext } from '@apollo/client/link/context';
import cookiesSerialize from '@h4a/core/libs/cookies-serialize';

const clients: Record<string, ApolloClient<any>> = {};

const cacheMerge = (currentCache: any, newCache: any) => {
    return deepmerge(currentCache, newCache, {
        arrayMerge: (destinationArray: any, sourceArray: any) => {
            return sourceArray;
        },
    });
};

/**
 * Get an Apollo client for a specific area
 * @param moduleName
 * @param area
 * @param initialState
 */
const getApolloClient = (
    moduleName: string,
    { area, apolloState, clientCacheKey, graphqlBasePath }: IPluginContext
) => {
    const cacheKey = JSON.stringify({
        ...clientCacheKey,
        moduleName,
        area,
    });

    if (area === undefined) {
        throw new Error('Area is undefined');
    }

    if (!clients.hasOwnProperty(cacheKey)) {
        console.log('Creating new H4A client for area', area);

        // Forward context cookies in the Apollo request (only while ssr)
        const headersLink = setContext((request, prevContext) => {
            if (typeof window === undefined) return prevContext;

            return {
                headers: {
                    ...(prevContext.headers || {}),
                    'x-h4a-area': area, // TODO: Check this. prevContext.headers is undefined
                    Cookie: cookiesSerialize(prevContext.cookies || {}),
                },
            };
        });

        const h4aLink = createHttpLink({
            uri: `${graphqlBasePath}${encodeURIComponent(moduleName)}`,
        });

        clients[cacheKey] = new ApolloClient({
            // connectToDevTools: true,
            link: headersLink.concat(h4aLink),
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
            headers: {
                'x-h4a-area': area,
            },
            queryDeduplication: true,
            assumeImmutableResults: true,
        });
    }

    // Update cache with new state
    const currentCache = clients[cacheKey].cache.extract();
    const newCache = cacheMerge(
        currentCache || {},
        apolloState[moduleName] || {}
    );
    clients[cacheKey].cache.restore(newCache);

    return clients[cacheKey];
};

export default getApolloClient;
