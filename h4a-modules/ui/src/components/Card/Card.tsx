import React, { PropsWithChildren } from 'react';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';

interface ICardProps extends IComponentProps {
    ['data-h4a-component']?: string;
}

const Card: React.FC<PropsWithChildren<ICardProps>> = ({
    className = 'h4a-ui-card',
    children,
    'data-h4a-component': dataH4aComponent = 'ui/card',
    ...props
}) => {
    return (
        <div
            className={className}
            data-h4a-component={dataH4aComponent}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardSchema: IComponentSchema = {
    title: 'Card',
    maxChildren: -1,
};

export default Card;
