import React from 'react';
import { IComponentProps } from '@h4a/core/interface/component-interface';

interface IMissingComponentProps extends IComponentProps {
    type: string | React.ComponentType<any>;
}

const MissingComponent: React.FC<IMissingComponentProps> = ({ type }) => {
    if (typeof type === 'string') return <div>Missing component {type}</div>;

    return <div>Missing component</div>;
};

export default MissingComponent;
