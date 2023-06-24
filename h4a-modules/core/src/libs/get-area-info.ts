import getEnvironments from '@h4a/core/libs/get-environments';

export interface IArea {
    name: string;
    baseUrl: string;
    basePath: string;
    graphqlBasePath: string;
    apiBasePath: string;
    relativePath: string;
}

const environments = getEnvironments();
let defaultArea: IArea | undefined = undefined;

const getDefaultArea = (): IArea => {
    if (defaultArea === undefined) {
        defaultArea = environments.areas.find((a: any) => a.default);
    }

    if (defaultArea === undefined) {
        throw new Error('No default area found');
    }

    return defaultArea;
};

const getAreaNameByPath = (path: string): any => {
    const res = environments.areas.find((a: any) => path.startsWith(a.baseUrl));
    if (res !== undefined) return res.name;

    return getDefaultArea().name;
};

/**
 * Get area information by path
 * No sensitive data should be handled in this function
 * @param areaName
 */
export const getAreaInfoByName = (areaName: string): IArea => {
    const area = environments.areas.find((a: any) => a.name === areaName);
    if (area !== undefined) {
        const basePath = '/' + area.baseUrl.replace(/^https?:\/\/.+?\//, '');

        return {
            name: area.name,
            baseUrl: area.baseUrl,
            graphqlBasePath: area.graphqlBasePath,
            apiBasePath: area.apiBasePath,
            relativePath: '',
            basePath,
        };
    }

    throw new Error(`Area ${areaName} not found`);
};

/**
 * Get area information by path
 * No sensitive data should be handled in this function
 * @param path
 */
const getAreaInfo = (path: string): IArea => {
    const areaName = getAreaNameByPath(path);
    const area = getAreaInfoByName(areaName);

    return {
        ...area,
        relativePath: path.replace(area.baseUrl, ''),
    };
};

export default getAreaInfo;
