'use client';

import React, { PropsWithChildren } from 'react';
import PluginContextProvider from '@h4a/core/context/PluginContextProvider';
import { IPluginPageContext } from '@h4a/core/interface/plugin-interface';

interface IProvidersProps {
    context?: IPluginPageContext;
}

const ContextProviders: React.FC<PropsWithChildren<IProvidersProps>> = ({
    children,
}) => {
    return <PluginContextProvider>{children}</PluginContextProvider>;
};

export default ContextProviders;
