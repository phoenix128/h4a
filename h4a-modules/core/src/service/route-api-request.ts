import apiHandler from '@h4a/core/service/api-handler';
import { NextApiRequest } from 'next';

const routeApiRequest = async (req: NextApiRequest) => {
    const pathname = (req as any).nextUrl.pathname.replace(/^\/.+?\//, '');
    const [moduleName, ...otherPath] = pathname.split('/');

    return apiHandler(
        decodeURIComponent(moduleName),
        req,
        otherPath?.join('/') || ''
    );
};

export default routeApiRequest;
