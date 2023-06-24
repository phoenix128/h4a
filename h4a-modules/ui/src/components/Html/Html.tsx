import React from 'react';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';

interface ISectionProps extends IComponentProps {
    html: string | undefined;
}

const Html: React.FC<ISectionProps> = ({ className = '', html }) => {
    return (
        <div
            className={className}
            data-h4a-component="ui/html"
            dangerouslySetInnerHTML={{ __html: html || '' }}
        />
    );
};

export const HtmlSchema: IComponentSchema = {
    title: 'Raw Html',
    maxChildren: 0,
};
export default Html;
