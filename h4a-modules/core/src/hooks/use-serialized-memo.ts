import { DependencyList, useMemo } from 'react';
import dependencySerializer from '@h4a/core/libs/dependency-serializer';

/**
 * Utility function to memoize a function with serialized deps
 * @param factory
 * @param deps
 */
const useSerializedMemo = <T>(factory: () => T, deps?: DependencyList): T => {
    // eslint-disable-next-line
    return useMemo(factory, dependencySerializer(deps));
};

export default useSerializedMemo;
