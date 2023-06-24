import { startServerAndCreateNextHandler } from '@as-integrations/next';
import {
    ApolloServer,
    GraphQLRequestContextWillSendResponse,
} from '@apollo/server';
import graphqlPluginRequire from '@h4a/core/generated/plugin-graphql';
import { IPluginContext } from '@h4a/core/interface/plugin-interface';
import contextProcessor from '@h4a/core/service/context-processor';
import { getAreaInfoByName } from '@h4a/core/libs/get-area-info';

const handler: Record<string, any> = {};

const buildServer = async (moduleName: string) => {
    const moduleGraphQl = graphqlPluginRequire(moduleName);
    if (moduleGraphQl === null) {
        return null;
    }

    const schema = await moduleGraphQl();
    return new ApolloServer({
        schema,
        plugins: [
            {
                // Add response headers from context
                requestDidStart: async () => {
                    return {
                        willSendResponse: async (
                            requestContext: GraphQLRequestContextWillSendResponse<IPluginContext>
                        ) => {
                            const { response, contextValue } = requestContext;

                            if (contextValue.responseHeaders) {
                                for (const [key, value] of Object.entries(
                                    contextValue.responseHeaders
                                )) {
                                    response.http.headers.set(key, value);
                                }
                            }
                        },
                    };
                },
            },
        ],
    });
};

const getGraphQlModuleHandler = async (moduleName: string) => {
    if (!handler.hasOwnProperty(moduleName)) {
        const s = await buildServer(moduleName);
        if (s === null) {
            handler[moduleName] = null;
            return null;
        }

        handler[moduleName] = startServerAndCreateNextHandler(s, {
            // Add cookies and area to input context
            context: async (request) => {
                const cookies: Record<string, string> = {};
                for (const cookie of (request.cookies as any).getAll()) {
                    const { name, value } = cookie;
                    cookies[name] = value;
                }

                // @ts-ignore
                const area = request.headers.get('x-h4a-area');
                if (area === undefined) {
                    throw new Error('Missing area header');
                }

                const areaInfo = getAreaInfoByName(area);

                const context: IPluginContext = {
                    // @ts-ignore
                    area,
                    cookies,
                    graphqlBasePath: areaInfo.graphqlBasePath,
                    apiBasePath: areaInfo.apiBasePath,
                    clientCacheKey: {},
                };

                await contextProcessor(context);
                return context;
            },
        });
    }

    return handler[moduleName];
};

export default getGraphQlModuleHandler;
