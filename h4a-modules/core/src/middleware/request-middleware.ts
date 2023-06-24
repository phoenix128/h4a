import { NextRequest, NextResponse } from 'next/server';
import mapHeadersToQs from '@h4a/core/libs/map-headers-to-qs';

const requestMiddleware = (request: NextRequest) => {
    const { nextUrl } = request;

    if (
        nextUrl.pathname.startsWith('/_next/') ||
        nextUrl.pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    mapHeadersToQs(request);

    return NextResponse.rewrite(nextUrl);
};

export default requestMiddleware;
