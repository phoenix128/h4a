'use client';

import React, { createContext, PropsWithChildren, useEffect } from 'react';
import { useLocalStorage, useSsr } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';

interface ISessionContext {
    sessionId: string;
}

interface ISessionContextProviderProps {}

export const SessionContext = createContext<ISessionContext>(
    {} as ISessionContext
);

/**
 * Get browsing session ID
 */
const getSessionId = () => {
    if (typeof window === 'undefined') return '';
    return (window as any).h4aSessionId || uuidv4();
};

const SessionContextProvider = ({
    children,
}: PropsWithChildren<ISessionContextProviderProps>) => {
    const sessionId = getSessionId();

    return (
        <SessionContext.Provider value={{ sessionId }}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionContextProvider;
