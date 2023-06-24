import React, { ComponentType, PropsWithChildren, useCallback } from 'react';
import modules from '@h4a/core/generated/modules';
import contextPluginRequire from '@h4a/core/generated/plugin-context';
import useSerializedCallback from '@h4a/core/hooks/use-serialized-callback';

interface IContextStackProps {
    stack: React.ComponentType<any>[];
    stackPosition?: number;
}

const ContextStack: React.FC<PropsWithChildren<IContextStackProps>> = ({
    stack,
    stackPosition = 0,
    children,
}) => {
    const Context = stack[stackPosition];

    if (stackPosition >= stack.length) return <>{children}</>;

    return (
        <Context>
            <ContextStack stack={stack} stackPosition={stackPosition + 1}>
                {children}
            </ContextStack>
        </Context>
    );
};

const PluginContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const contextStack = useSerializedCallback(() => {
        return modules.reduce((acc: ComponentType<any>[], moduleName) => {
            const l = contextPluginRequire(moduleName);
            if (l === null) return acc;

            return [...l, ...acc];
        }, []);
    }, [modules]);

    return <ContextStack stack={contextStack()}>{children}</ContextStack>;
};

export default PluginContextProvider;
