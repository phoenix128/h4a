import { NextRequest } from 'next/server';
import graphqlHandler from '@h4a/core/service/graphql-handler';

const routeGraphqlRequest = async (req: NextRequest) => {
    const pathname = req.nextUrl.pathname.replace(/^\/.+?\//, '');
    const moduleName = decodeURIComponent(pathname);

    return graphqlHandler(moduleName, req);
};

export default routeGraphqlRequest;
