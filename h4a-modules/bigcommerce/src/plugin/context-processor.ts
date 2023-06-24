import assertServerSide from '@h4a/core/libs/assert-server-side';
import {
    IPluginContext,
    IPluginContextProcessor,
} from '@h4a/core/interface/plugin-interface';
import getCustomerDataFromCookies from '@h4a/bigcommerce/libs/get-customer-data-from-cookies';
import { query } from '@h4a/bigcommerce/libs/graphql-storefront';
import { QUERY_SETTINGS } from '@h4a/bigcommerce/graphql/gql/query-settings';

/**
 * Get bigcommerce settings
 * @param area
 * @param context
 */
const getSettings = async (
    area: string,
    context: IPluginContext
): Promise<any> => {
    // BEWARE: Cannot use getApolloClient() here because it will cause a recursive loop
    // Directly invoking BigCommerce GraphQL API
    const res = await query(QUERY_SETTINGS, {}, context);
    return res.data.site.settings;
};

const contextProcessor: IPluginContextProcessor = async (context) => {
    assertServerSide();
    const { area, cookies } = context;
    const customerData = getCustomerDataFromCookies(area, cookies);

    // Use different cache containers for each customer group
    context.clientCacheKey['bigcommerce'] = customerData.customerGroupId;
    context.bigcommerce = {
        customerData,
    };

    // Must be called after context.bigcommerce.customerData is set
    context.bigcommerce.settings = await getSettings(area, context);
};

export default contextProcessor;
