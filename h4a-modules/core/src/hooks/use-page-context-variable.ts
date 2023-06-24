import resolveVariable from '@h4a/core/libs/resolve-variable';
import usePageContext from '@h4a/core/hooks/use-page-context';

const usePageContextVariable = <T = string>(
    value: T | undefined,
    contextVariable?: string
): T | undefined => {
    const ctx = usePageContext();

    const res = (
        value === undefined && contextVariable !== undefined
            ? resolveVariable(contextVariable, ctx)
            : value
    ) as T;

    if (res !== undefined) {
        return res;
    }

    return undefined;
};

export default usePageContextVariable;
