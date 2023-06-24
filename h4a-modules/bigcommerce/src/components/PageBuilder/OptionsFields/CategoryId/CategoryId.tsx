import React, { useCallback, useState } from 'react';
import { ISettingsComponentProps } from '@h4a/core/interface/component-interface';
import DropdownList from '@h4a/core/components/PageBuilder/OptionsFields/DropdownList';
import useCategorySearch from '@h4a/bigcommerce/hooks/use-category-search';
import { components } from 'react-select';

interface IProductIdProps extends ISettingsComponentProps {}

const Option: React.FC = ({ children, ...props }: any) => {
    const { payload } = props.data;

    return (
        <div>
            <components.Option {...props}>
                <div
                    className={'flex flex-row items-center'}
                    style={{ marginLeft: payload?.level * 20 + 'px' }}
                >
                    <div className={'flex-shrink text-sm'}>
                        <div className={'text-xs'}>{payload?.path}</div>
                        <div className={'font-semibold'}>{payload?.name}</div>
                    </div>
                </div>
            </components.Option>
        </div>
    );
};

const CategoryId: React.FC<IProductIdProps> = ({
    disabled,
    value,
    id,
    onChange,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const searchResults = useCategorySearch(searchTerm);

    const categoriesOptions = searchResults?.map((e) => ({
        label: e?.name,
        value: e?.entityId,
        payload: e,
    }));

    const selectedCategory = JSON.parse(
        JSON.stringify(
            categoriesOptions.find((e) => e?.value === value) || '{}'
        )
    );
    if (selectedCategory?.payload) {
        selectedCategory.payload.level = 0;
    }

    const handleChange = useCallback(
        (data: any) => {
            onChange(data == null ? undefined : data.value);
        },
        [onChange]
    );

    return (
        <DropdownList
            isDisabled={disabled}
            isClearable={true}
            isSearchable={true}
            onInputChange={setSearchTerm}
            components={{ Option, SingleValue: Option }}
            options={categoriesOptions}
            id={id}
            value={disabled ? null : selectedCategory}
            onChange={handleChange}
        />
    );
};

export default CategoryId;
