import React from 'react';
import useSelectedComponent from '@h4a/core/hooks/pagebuilder/use-selected-component';

const ComponentName: React.FC = () => {
    const component = useSelectedComponent();
    const schema = component?.schema;

    if (!schema) return null;

    return (
        <div className={'h4a-page-builder-component-title'}>{schema.title}</div>
    );
};

export default ComponentName;
