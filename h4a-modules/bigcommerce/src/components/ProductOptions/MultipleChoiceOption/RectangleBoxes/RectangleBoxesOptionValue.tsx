import React, { useCallback } from 'react';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import { MultipleChoiceOptionValue } from '@h4a/bigcommerce/generated/gql/graphql';
import clsx from 'clsx';

interface IRectangleBoxesOptionValue extends IComponentProps {
    value: MultipleChoiceOptionValue;
    onClick?: (value: MultipleChoiceOptionValue) => void;
    isSelected?: boolean;
    isDisabled?: boolean;
}

const RectangleBoxesOptionValue: React.FC<IRectangleBoxesOptionValue> = ({
    value,
    className = 'h4a-bigcommerce-rectangle-boxes-option-value',
    onClick,
    isSelected,
    isDisabled = false,
}) => {
    const { label } = value;

    const handleOnClick = useCallback(() => {
        onClick && onClick(value);
    }, [onClick, value]);

    return (
        <div
            title={label}
            className={clsx(
                className,
                isSelected ? 'h4a-selected' : null,
                isDisabled ? 'h4a-disabled' : null
            )}
            onClick={handleOnClick}
        >
            <div>{label}</div>
        </div>
    );
};

export default RectangleBoxesOptionValue;
