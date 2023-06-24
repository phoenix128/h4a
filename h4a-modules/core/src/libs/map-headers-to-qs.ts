import { NextRequest, NextResponse } from 'next/server';

export const PARAM_PREFIX = '_h4a_';
export const PARAM_NORMALIZED_URL = `${PARAM_PREFIX}nu`;
export const PARAM_URI = `${PARAM_PREFIX}u`;
export const PARAM_COOKIES = `${PARAM_PREFIX}c`;

const getUri = (url: string, searchParams: URLSearchParams) => {
    const currentUri = new URL(url);
    for (const [key, value] of Object.entries(searchParams)) {
        if (key.startsWith(PARAM_PREFIX)) continue; // Filter reserved params

        if (Array.isArray(value)) {
            value.map((v) => currentUri.searchParams.append(key, v));
        } else {
            currentUri.searchParams.append(key, value);
        }
    }

    return currentUri.pathname + currentUri.search;
};

/**
 * Next.js 13 seems to have problems reading headers from a page.
 * This middleware is used to rewrite the request url by adding fake parameters containing additional information.
 * @param request
 */
const mapHeadersToQs = (request: NextRequest) => {
    const {
        nextUrl,
        cookies,
        nextUrl: { searchParams },
    } = request;

    const requestHost = request.headers.get('host');

    const baseUrl = `${nextUrl.protocol}//${requestHost}/`;
    const { pathname } = nextUrl;
    const normalizedUrl = baseUrl + pathname.replace(/^\//, '');
    const uri = getUri(request.url, nextUrl.searchParams);

    const isMatching =
        searchParams.get(PARAM_NORMALIZED_URL) === normalizedUrl &&
        searchParams.get(PARAM_URI) === uri;

    if (isMatching) {
        return NextResponse.next();
    }

    searchParams.set(PARAM_NORMALIZED_URL, normalizedUrl);
    searchParams.set(PARAM_URI, uri);

    const cookieParam: Record<string, string> = {};
    for (const cookie of cookies.getAll()) {
        const { name, value } = cookie;
        cookieParam[name] = value;
    }

    searchParams.set(PARAM_COOKIES, JSON.stringify(cookieParam));
};

export default mapHeadersToQs;
