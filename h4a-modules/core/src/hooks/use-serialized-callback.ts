import { DependencyList, useCallback } from 'react';
import dependencySerializer from '@h4a/core/libs/dependency-serializer';

/**
 * Utility function to callback a function with serialized deps
 * @param fn
 * @param deps
 */
const useSerializedCallback = <T extends Function>(
    fn: T,
    deps?: DependencyList
) => {
    // eslint-disable-next-line
    return useCallback(fn, dependencySerializer(deps) as DependencyList);
};

export default useSerializedCallback;
