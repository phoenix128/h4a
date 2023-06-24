import { NextRequest } from 'next/server';
import routeGraphqlRequest from '@h4a/core/service/route-graphql-request';

export const GET = (request: NextRequest) => routeGraphqlRequest(request);
export const POST = (request: NextRequest) => routeGraphqlRequest(request);
