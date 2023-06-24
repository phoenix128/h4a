/**
 * Resolves a variable from the variables object
 * @param variablePath
 * @param dataSource
 */
const resolveVariable = (
    variablePath: string,
    dataSource: Record<string, any>
): any => {
    const pathParts = variablePath.split('.');

    const resolve = (data: Record<string, any>, pathParts: string[]): any => {
        if (pathParts.length === 0 || data === undefined) {
            return data;
        }

        const currentPart = pathParts.shift();

        if (currentPart && data.hasOwnProperty(currentPart)) {
            if (Array.isArray(data[currentPart])) {
                return data[currentPart].map((item: any) =>
                    resolve(item, [...pathParts])
                );
            } else {
                return resolve(data[currentPart], pathParts);
            }
        }

        return undefined;
    };

    return resolve(dataSource, pathParts);
};

export default resolveVariable;
