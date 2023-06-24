import { DependencyList, EffectCallback } from 'react';
import useSessionId from '@h4a/core/hooks/use-session-id';
import { useSsr } from 'usehooks-ts';

const useSessionEffect = (
    id: string,
    effect: EffectCallback,
    deps?: DependencyList
) => {
    const sessionId = useSessionId();
    const { isServer } = useSsr();
    const callbackKey = `${sessionId}:${id}`;

    if (isServer) return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const depsKey = JSON.stringify(deps);

    if ((window as any).h4aSessionEffect === undefined) {
        (window as any).h4aSessionEffect = {};
    }

    if ((window as any).h4aSessionEffect[callbackKey] !== depsKey) {
        effect();
        (window as any).h4aSessionEffect[callbackKey] = depsKey;
    }
};

export default useSessionEffect;
