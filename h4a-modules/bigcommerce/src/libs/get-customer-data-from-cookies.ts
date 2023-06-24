import jwt from 'jsonwebtoken';
import getAreaConfig from '@h4a/core/libs/get-area-config';
import {
    COOKIE_CUSTOMER_PREFIX,
    ICustomerData,
} from '@h4a/bigcommerce/interface/customer-interface';

/**
 * Extract cookies (SHOP_TOKEN) from params request
 * @param area
 * @param cookies
 */
const getCustomerDataFromCookies = (
    area: string,
    cookies: Record<string, string>
): ICustomerData => {
    const {
        bigcommerce: { jwtSecret },
    } = getAreaConfig(area);

    const customerJwt = cookies[COOKIE_CUSTOMER_PREFIX + area] || undefined;
    if (customerJwt) {
        try {
            const decoded: any = jwt.verify(customerJwt, '' + jwtSecret);
            return {
                shopToken: decoded.data.shopToken,
                customerId: decoded.data.entityId,
                customerGroupId: decoded.data.customerGroupId,
            };
        } catch (e) {
            console.log('Error decoding customerJwt', e);
        }
    }

    return {
        shopToken: undefined,
        customerId: 0,
        customerGroupId: 0,
    };
};

export default getCustomerDataFromCookies;
