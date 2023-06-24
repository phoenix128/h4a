import React, { useCallback } from 'react';
import { SwatchOptionValue as GqlSwatchOptionValue } from '@h4a/bigcommerce/generated/gql/graphql';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import settings from '@h4a/bigcommerce/settings';
import SwatchOptionValueImage from '@h4a/bigcommerce/components/ProductOptions/MultipleChoiceOption/Swatches/SwatchOptionValueImage';
import SwatchOptionValueColors from '@h4a/bigcommerce/components/ProductOptions/MultipleChoiceOption/Swatches/SwatchOptionValueColors';
import clsx from 'clsx';

interface ISwatchOptionValueProps extends IComponentProps {
    isSelected?: boolean;
    isDisabled?: boolean;
    value: GqlSwatchOptionValue;
    onClick?: (value: GqlSwatchOptionValue) => void;
}

const SwatchOptionValue: React.FC<ISwatchOptionValueProps> = ({
    isSelected = false,
    isDisabled = false,
    value,
    className = 'h4a-bigcommerce-swatch-option-value',
    onClick,
}) => {
    const { imageUrl, label } = value;
    const {
        imagesSizes: {
            swatches: { width, height },
        },
    } = settings;

    const handleClick = useCallback(() => {
        onClick && onClick(value);
    }, [onClick, value]);

    return (
        <div
            title={label}
            onClick={handleClick}
            className={clsx(
                className,
                isSelected ? 'h4a-selected' : null,
                isDisabled ? 'h4a-disabled' : null
            )}
        >
            {imageUrl && <SwatchOptionValueImage value={value} />}
            {!imageUrl && <SwatchOptionValueColors value={value} />}
        </div>
    );
};

export default SwatchOptionValue;
