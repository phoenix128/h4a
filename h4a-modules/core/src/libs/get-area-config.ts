import getEnvironments from '@h4a/core/libs/get-environments';

export const getDefaultAreaConfig = (): any => {
    const environments = getEnvironments();

    const area = environments.areas.find((a: any) => a.default);
    if (area === undefined) {
        throw new Error(`Default area not found`);
    }

    return area.config;
};

/**
 * Get area configuration by name
 * @param areaName
 */
const getAreaConfig = (areaName: string): any => {
    const environments = getEnvironments();

    const area = environments.areas.find((a: any) => a.name === areaName);
    if (area === undefined) {
        throw new Error(`Area ${areaName} not found`);
    }

    return area.config;
};

export default getAreaConfig;
