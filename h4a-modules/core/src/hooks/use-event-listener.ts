import { useCallback, useEffect } from 'react';

const useEventListener = <TEventData = any>(
    eventName: string,
    handler: (payload: TEventData) => void
) => {
    const handlerCallback = useCallback(
        (evt: Event) => {
            handler((evt as any).detail as TEventData);
        },
        [handler]
    );

    useEffect(() => {
        window.addEventListener(eventName, handlerCallback);

        return () => {
            window.removeEventListener(eventName, handlerCallback);
        };
    }, [eventName, handler, handlerCallback]);
};

export default useEventListener;
