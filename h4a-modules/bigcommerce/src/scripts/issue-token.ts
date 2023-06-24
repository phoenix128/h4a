import managementApi from '@h4a/bigcommerce/libs/management-api';
import { BIGCOMMERCE_CHANNEL_ID } from '@h4a/bigcommerce/libs/config';
import { BASE_URL } from '@h4a/core/libs/config';

/**
 * Issue token
 */
const issueToken = async (): Promise<string> => {
    const res = await managementApi(
        'POST',
        '/storefront/api-token',
        {},
        {
            expires_at: 2147483647,
            channel_id: BIGCOMMERCE_CHANNEL_ID,
            allowed_cors_origins: [BASE_URL],
        }
    );

    return res.data.token;
};

(async () => {
    const token = await issueToken();
    console.log(token);
})();
