import React from 'react';

export interface IComponentProps {
    className?: string;
}

export interface ISettingsComponentSchemaProps<T = any, U = any> {
    title: string;
    contextVariable?: string;
    defaultValue?: U;
    component: React.FC<ISettingsComponentProps<T>>;
    settings?: T;
}

export interface ISettingsComponentProps<T = any> {
    id: string;
    value: any;
    onChange: (value: any) => void;
    disabled?: boolean;
    settings: T;
}

export interface IComponentSchema {
    title: string;
    maxChildren: number;
    props?: Record<string, ISettingsComponentSchemaProps>;
}
