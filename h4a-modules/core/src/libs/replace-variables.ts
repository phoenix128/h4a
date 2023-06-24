import resolveVariable from '@h4a/core/libs/resolve-variable';

/**
 * Replaces variables in the source object with the values from the variables object
 * @param source
 * @param variables
 */
const replaceVariables = (
    source: { [key: string]: any },
    variables: { [key: string]: any }
): { [key: string]: any } => {
    const result = { ...source };

    for (const [key, value] of Object.entries(result)) {
        if (Array.isArray(value)) {
            result[key] = value;
        } else if (typeof value === 'string') {
            // If it is a pure variable, resolve it and assign directly.
            // This will prevent from casting the variable to a string
            const fullValueMatch = value.match(/^\$\{(.+?)}$/);
            if (fullValueMatch !== null) {
                const resolvedValue = resolveVariable(
                    fullValueMatch[1],
                    variables
                );
                result[key] = resolvedValue || '';
                continue;
            }

            result[key] = value.replace(/\$\{(.+?)}/g, (_, variable) => {
                const variableValue = resolveVariable(variable, variables);
                return variableValue !== undefined ? variableValue : '';
            });
        } else if (typeof value === 'object') {
            result[key] = replaceVariables(value, variables);
        }
    }

    return result;
};

export default replaceVariables;
