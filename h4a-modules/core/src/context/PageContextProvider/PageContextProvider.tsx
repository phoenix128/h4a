'use client';

import React, { createContext, PropsWithChildren } from 'react';
import { IPluginPageContext } from '@h4a/core/interface/plugin-interface';

interface IPageContext {
    context: IPluginPageContext;
    setContext: (context: IPluginPageContext) => void;
}

interface IPageContextProviderProps {
    context?: IPluginPageContext;
}

export const PageContext = createContext<IPageContext>({} as IPageContext);

const PageContextProvider = ({
    context: initialContext = {} as IPluginPageContext,
    children,
}: PropsWithChildren<IPageContextProviderProps>) => {
    const [context, setContext] =
        React.useState<IPluginPageContext>(initialContext);

    return (
        <PageContext.Provider value={{ context, setContext }}>
            {children}
        </PageContext.Provider>
    );
};

export default PageContextProvider;
