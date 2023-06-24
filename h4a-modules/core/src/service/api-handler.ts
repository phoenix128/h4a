import { NextResponse } from 'next/server';
import apiPluginRequire from '@h4a/core/generated/plugin-api';
import { NextApiRequest } from 'next';

const apiHandler = async (
    moduleName: string,
    request: NextApiRequest,
    path: string
) => {
    const handler = apiPluginRequire(moduleName);
    if (!handler) {
        return NextResponse.json({ error: 'api-not-found' }, { status: 404 });
    }

    const res = await handler(request, path);
    if (!res) {
        return NextResponse.json({ error: 'api-not-found' }, { status: 404 });
    }

    return NextResponse.json(res[0], res[1]);
};

export default apiHandler;
