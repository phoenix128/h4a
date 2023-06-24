import React, { useCallback } from 'react';
import { MultipleChoiceOption } from '@h4a/bigcommerce/generated/gql/graphql';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import DropdownList from '@h4a/ui/components/DropdownList';

interface IMultipleChoiceOptionRectangleBoxesProps extends IComponentProps {
    option: MultipleChoiceOption;
    onOptionChange?: (option: MultipleChoiceOption, value: any) => void;
    disabledOptions?: number[];
    value: any;
}

const MultipleChoiceOptionDropdownList: React.FC<
    IMultipleChoiceOptionRectangleBoxesProps
> = ({
    option,
    className = 'h4a-bigcommerce-multiple-choice-option-dropdown-list',
    disabledOptions,
    value,
    onOptionChange,
}) => {
    const values = option.values.edges!.map((v) => v!.node);

    const handleOnChange = useCallback(
        (selectedOption: any) => {
            const { value } = selectedOption;
            onOptionChange && onOptionChange(option, Number(value));
        },
        [onOptionChange, option]
    );

    const options = values.map((v) => ({
        value: '' + v.entityId,
        label: v.label,
        isDisabled: disabledOptions?.includes(v.entityId),
        isSelected: value === v.entityId,
    }));

    return (
        <div
            className={className}
            data-h4a-component="bigcommerce/multiple-choice-option-dropdown-list"
        >
            <DropdownList
                instanceId={`option-${option.entityId}`}
                options={options}
                onChange={handleOnChange}
            />
        </div>
    );
};

export default MultipleChoiceOptionDropdownList;
