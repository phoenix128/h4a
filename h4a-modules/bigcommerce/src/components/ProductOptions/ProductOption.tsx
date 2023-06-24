import { IComponentProps } from '@h4a/core/interface/component-interface';
import React from 'react';
import {
    CatalogProductOption,
    CatalogProductOptionValue,
    TextFieldOption as TextFieldOptionType,
    MultipleChoiceOption as MultipleChoiceOptionType,
    MultiLineTextFieldOption as MultiLineTextFieldOptionType,
} from '@h4a/bigcommerce/generated/gql/graphql';
import { useTranslation } from 'react-i18next';
import MultipleChoiceOption from '@h4a/bigcommerce/components/ProductOptions/MultipleChoiceOption';
import TextFieldOption from '@h4a/bigcommerce/components/ProductOptions/TextFieldOption';
import MultiLineTextFieldOption from '@h4a/bigcommerce/components/ProductOptions/MultiLineTextFieldOption';

export interface IProductOptionProps extends IComponentProps {
    option: CatalogProductOption & { __typename: string };
    onOptionChange?: (option: CatalogProductOption, value: any) => void;
    disabledOptions?: number[];
    value?: number;
}

const getOptionComponent = (
    typeName: string,
    option: CatalogProductOption,
    disabledOptions: number[] | undefined,
    value: any,
    onOptionChange?: (
        option: CatalogProductOption,
        value: CatalogProductOptionValue
    ) => void
) => {
    switch (typeName) {
        case 'MultipleChoiceOption':
            return (
                <MultipleChoiceOption
                    option={option as MultipleChoiceOptionType}
                    disabledOptions={disabledOptions}
                    onOptionChange={onOptionChange}
                    value={value}
                />
            );
        case 'TextFieldOption':
            return (
                <TextFieldOption
                    option={option as TextFieldOptionType}
                    onOptionChange={onOptionChange}
                    value={value}
                />
            );
        case 'MultiLineTextFieldOption':
            return (
                <MultiLineTextFieldOption
                    option={option as MultiLineTextFieldOptionType}
                    onOptionChange={onOptionChange}
                    value={value}
                />
            );
    }

    return null;
};

const ProductOption: React.FC<IProductOptionProps> = ({
    option,
    onOptionChange,
    value,
    disabledOptions,
    className = 'h4a-bigcommerce-product-option',
}) => {
    const { t } = useTranslation();
    const { isRequired, __typename: typeName } = option;

    return (
        <div
            className={className}
            data-h4a-component="bigcommerce/product-option"
        >
            <span className="h4a-label">{option.displayName} </span>
            {isRequired && (
                <span className="h4a-required">
                    ({t('product.option.required')})
                </span>
            )}
            <div title={option.displayName}>
                {getOptionComponent(
                    typeName,
                    option,
                    disabledOptions,
                    value,
                    onOptionChange
                )}
            </div>
        </div>
    );
};

export default ProductOption;
