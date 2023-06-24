import React, { useCallback } from 'react';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import {
    MultiLineTextFieldOption,
    TextFieldOption,
} from '@h4a/bigcommerce/generated/gql/graphql';

interface IMultiLineTextFieldOptionProps extends IComponentProps {
    option: MultiLineTextFieldOption;
    onOptionChange?: (option: TextFieldOption, value: any) => void;
    value: any;
}

const MultiLineTextFieldOption: React.FC<IMultiLineTextFieldOptionProps> = ({
    className = 'h4a-bigcommerce-multiline-text-field-option',
    option,
    value,
}) => {
    const handleChange = useCallback(() => {}, []);
    const { minLength, maxLength, maxLines } = option;

    return (
        <div
            className={className}
            data-h4a-component="bigcommerce/multiline-text-field-option"
        >
            <textarea
                value={value}
                minLength={minLength || undefined}
                maxLength={maxLength || undefined}
                onChange={handleChange}
                rows={maxLines || 3}
            />{' '}
        </div>
    );
};

export default MultiLineTextFieldOption;
