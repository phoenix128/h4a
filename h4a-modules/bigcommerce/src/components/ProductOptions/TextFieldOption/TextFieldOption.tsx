import React, { useCallback } from 'react';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import { TextFieldOption } from '@h4a/bigcommerce/generated/gql/graphql';

interface ITextFieldOptionProps extends IComponentProps {
    option: TextFieldOption;
    onOptionChange?: (option: TextFieldOption, value: any) => void;
    value: any;
}

const TextFieldOption: React.FC<ITextFieldOptionProps> = ({
    className = 'h4a-bigcommerce-text-field-option',
    option,
    value,
}) => {
    const handleChange = useCallback(() => {}, []);
    const { minLength, maxLength } = option;

    return (
        <div
            className={className}
            data-h4a-component="bigcommerce/text-field-option"
        >
            <input
                value={value}
                type={'text'}
                onChange={handleChange}
                min={minLength || undefined}
                max={maxLength || undefined}
            />{' '}
        </div>
    );
};

export default TextFieldOption;
