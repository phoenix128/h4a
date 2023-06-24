import { NextRequest, NextResponse } from 'next/server';
import getGraphQlModuleHandler from '@h4a/core/service/get-graphql-module-handler';

const graphqlHandler = async (moduleName: string, request: NextRequest) => {
    const handler = await getGraphQlModuleHandler(moduleName);

    if (!handler) {
        return NextResponse.json(
            { error: 'module-not-supported', moduleName },
            { status: 404 }
        );
    }

    return handler(request);
};

export default graphqlHandler;
