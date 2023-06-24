import React from 'react';
import { MultipleChoiceOption } from '@h4a/bigcommerce/generated/gql/graphql';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import MultipleChoiceOptionSwatches from '@h4a/bigcommerce/components/ProductOptions/MultipleChoiceOption/Swatches';
import MultipleChoiceOptionRectangleBoxes from '@h4a/bigcommerce/components/ProductOptions/MultipleChoiceOption/RectangleBoxes';
import MultipleChoiceOptionDropdownList from '@h4a/bigcommerce/components/ProductOptions/MultipleChoiceOption/DropdownList';

interface IMultipleChoiceOptionProps extends IComponentProps {
    option: MultipleChoiceOption;
    onOptionChange?: (option: MultipleChoiceOption, value: any) => void;
    disabledOptions?: number[];
    value: any;
}

const getMultipleChoiceOptionRender = (
    option: MultipleChoiceOption,
    value: any,
    disabledOptions?: number[],
    onOptionChange?: (option: MultipleChoiceOption, value: any) => void
) => {
    switch (option.displayStyle) {
        case 'Swatch':
            return (
                <MultipleChoiceOptionSwatches
                    option={option}
                    value={value}
                    disabledOptions={disabledOptions}
                    onOptionChange={onOptionChange}
                />
            );
        case 'RectangleBoxes':
            return (
                <MultipleChoiceOptionRectangleBoxes
                    option={option}
                    value={value}
                    disabledOptions={disabledOptions}
                    onOptionChange={onOptionChange}
                />
            );
        case 'DropdownList':
            return (
                <MultipleChoiceOptionDropdownList
                    option={option}
                    value={value}
                    disabledOptions={disabledOptions}
                    onOptionChange={onOptionChange}
                />
            );
    }

    return null;
};

const MultipleChoiceOption: React.FC<IMultipleChoiceOptionProps> = ({
    option,
    className = 'h4a-bigcommerce-multiple-choice-option',
    value,
    disabledOptions,
    onOptionChange,
}) => {
    return (
        <div
            className={className}
            data-h4a-component="bigcommerce/multiple-choice-option"
        >
            {getMultipleChoiceOptionRender(
                option,
                value,
                disabledOptions,
                onOptionChange
            )}
        </div>
    );
};

export default MultipleChoiceOption;
