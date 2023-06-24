import React, { useCallback } from 'react';
import {
    MultipleChoiceOption,
    MultipleChoiceOptionValue,
} from '@h4a/bigcommerce/generated/gql/graphql';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import RectangleBoxesOptionValue from '@h4a/bigcommerce/components/ProductOptions/MultipleChoiceOption/RectangleBoxes/RectangleBoxesOptionValue';

interface IMultipleChoiceOptionRectangleBoxesProps extends IComponentProps {
    option: MultipleChoiceOption;
    onOptionChange?: (option: MultipleChoiceOption, value: any) => void;
    disabledOptions?: number[];
    value: any;
}

const MultipleChoiceOptionRectangleBoxes: React.FC<
    IMultipleChoiceOptionRectangleBoxesProps
> = ({
    option,
    className = 'h4a-bigcommerce-multiple-choice-option-rectangle-boxes',
    disabledOptions,
    value,
    onOptionChange,
}) => {
    const values = option.values.edges!.map((v) => v!.node);

    const handleOnClick = useCallback(
        (value: MultipleChoiceOptionValue) => {
            onOptionChange && onOptionChange(option, value.entityId);
        },
        [onOptionChange, option]
    );

    return (
        <div
            className={className}
            data-h4a-component="bigcommerce/multiple-choice-option-rectangle-boxes"
        >
            {values.map((v) => (
                <RectangleBoxesOptionValue
                    isSelected={value === v.entityId}
                    isDisabled={disabledOptions?.includes(v.entityId)}
                    value={v}
                    key={v.entityId}
                    onClick={handleOnClick}
                />
            ))}
        </div>
    );
};

export default MultipleChoiceOptionRectangleBoxes;
