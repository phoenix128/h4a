import { ISearchParams } from '@h4a/core/interface/next-interface';
import { PARAM_COOKIES } from '@h4a/core/libs/map-headers-to-qs';

/**
 * Extract cookies injected in search params by request middleware
 * @param searchParams
 */
const getCookiesFromSearchParams = (
    searchParams: ISearchParams
): Record<string, string> => {
    const cookies = searchParams[PARAM_COOKIES];
    if (!cookies) {
        return {};
    }

    return JSON.parse('' + cookies);
};

export default getCookiesFromSearchParams;
