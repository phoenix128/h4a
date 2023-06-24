import routeApiRequest from '@h4a/core/service/route-api-request';
import { NextApiRequest } from 'next';

export const GET = (request: NextApiRequest) => routeApiRequest(request);
export const POST = (request: NextApiRequest) => routeApiRequest(request);
export const PUT = (request: NextApiRequest) => routeApiRequest(request);
export const PATCH = (request: NextApiRequest) => routeApiRequest(request);
export const DELETE = (request: NextApiRequest) => routeApiRequest(request);
