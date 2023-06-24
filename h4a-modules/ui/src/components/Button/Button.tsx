import React, {
    DetailedHTMLProps,
    PropsWithChildren,
    ButtonHTMLAttributes,
} from 'react';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import clsx from 'clsx';

interface ICardProps
    extends IComponentProps,
        DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        > {
    isPrimary?: boolean;
}

const Button: React.FC<PropsWithChildren<ICardProps>> = ({
    className = 'h4a-ui-button',
    children,
    isPrimary = true,
    ...props
}) => {
    return (
        <button
            data-h4a-component="ui/button"
            className={clsx(className, isPrimary ? 'h4a-primary' : null)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
