import React, { useCallback } from 'react';
import { MultipleChoiceOption } from '@h4a/bigcommerce/generated/gql/graphql';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import SwatchOptionValue from '@h4a/bigcommerce/components/ProductOptions/MultipleChoiceOption/Swatches/SwatchOptionValue';
import { SwatchOptionValue as GqlSwatchOptionValue } from '@h4a/bigcommerce/generated/gql/graphql';

interface IMultipleChoiceOptionSwatchesProps extends IComponentProps {
    option: MultipleChoiceOption;
    onOptionChange?: (option: MultipleChoiceOption, value: any) => void;
    disabledOptions?: number[];
    value: any;
}

const MultipleChoiceOptionSwatches: React.FC<
    IMultipleChoiceOptionSwatchesProps
> = ({
    option,
    className = 'h4a-bigcommerce-multiple-choice-option-swatches',
    disabledOptions,
    onOptionChange,
    value,
}) => {
    const values = option.values.edges!.map((v) => v!.node);

    const handleOnClick = useCallback(
        (value: GqlSwatchOptionValue) => {
            onOptionChange && onOptionChange(option, value.entityId);
        },
        [onOptionChange, option]
    );

    return (
        <div
            className={className}
            data-h4a-component="bigcommerce/multiple-choice-option-swatches"
        >
            {values.map((v) => (
                <SwatchOptionValue
                    isDisabled={disabledOptions?.includes(v.entityId)}
                    isSelected={value === v.entityId}
                    onClick={handleOnClick}
                    key={v.entityId}
                    value={v as GqlSwatchOptionValue}
                />
            ))}
        </div>
    );
};

export default MultipleChoiceOptionSwatches;
