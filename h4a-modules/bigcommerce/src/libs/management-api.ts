import getAreaConfig from '@h4a/core/libs/get-area-config';
import { IPluginContext } from '@h4a/core/interface/plugin-interface';

const managementApi = async (
    method: string,
    path: string,
    searchParams: Record<string, string>,
    body: any,
    context: IPluginContext
) => {
    const { area } = context;
    const { bigcommerce } = getAreaConfig(area);

    const apiBaseUrl = `https://api.bigcommerce.com/stores/${bigcommerce.storeHash}/v3`;

    const fetchConfig: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Auth-Token': bigcommerce.authToken,
            'X-Auth-Client': bigcommerce.clientId,
        },
    };

    if (method === 'POST' || method === 'PUT') {
        fetchConfig.body = JSON.stringify(body);
    }

    const url = new URL(path, 'https://a');
    for (const key in searchParams) {
        url.searchParams.set(key, searchParams[key]);
    }

    const fullUrl = `${apiBaseUrl}${url.pathname}${url.search}`;
    const response = await fetch(fullUrl, fetchConfig);
    return response.json();
};

export default managementApi;
