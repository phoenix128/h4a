import { DependencyList, EffectCallback, useEffect } from 'react';
import dependencySerializer from '@h4a/core/libs/dependency-serializer';

/**
 * Utility function to run an effect with serialized deps
 * @param effect
 * @param deps
 */
const useSerializedEffect = (effect: EffectCallback, deps?: DependencyList) => {
    // eslint-disable-next-line
    return useEffect(effect, dependencySerializer(deps));
};

export default useSerializedEffect;
