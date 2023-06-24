import React from 'react';

export type IDynamicComponentProps = Record<string, any>;

export interface IDynamicComponent {
    id: string;
    type: string | React.ComponentType<any>;
    props?: IDynamicComponentProps;
    components?: IDynamicComponent[];
}

export interface ITemplate {
    components: IDynamicComponent[];
}
