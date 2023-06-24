import React, { useCallback, useState } from 'react';
import { ISettingsComponentProps } from '@h4a/core/interface/component-interface';
import DropdownList from '@h4a/core/components/PageBuilder/OptionsFields/DropdownList';
import { components } from 'react-select';
import useProductSearch from '@h4a/bigcommerce/hooks/use-product-search';
import Image from 'next/image';
import useProduct from '@h4a/bigcommerce/hooks/use-product';

interface IProductIdProps extends ISettingsComponentProps {}

const Option: React.FC = ({ children, ...props }: any) => {
    const { payload } = props.data;

    return (
        <div>
            <components.Option {...props}>
                <div className={'flex flex-row items-center'}>
                    <div className={'w-10 mr-2 flex-grow-0 flex-shrink-0'}>
                        <Image
                            src={payload?.defaultImage?.url}
                            alt={payload?.name}
                            width={60}
                            height={60}
                        />
                    </div>
                    <div className={'flex-shrink text-sm'}>
                        <div className={'font-semibold'}>{payload?.sku}</div>
                        <div>{payload?.name}</div>
                    </div>
                </div>
            </components.Option>
        </div>
    );
};

const ProductId: React.FC<IProductIdProps> = ({
    disabled,
    value,
    id,
    onChange,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const searchResults = useProductSearch(searchTerm);
    const productData = useProduct(value);
    const product = productData?.data?.site?.product;

    const productOptions =
        searchResults?.data?.site?.search?.searchProducts?.products?.edges?.map(
            (e) => ({
                label: e?.node?.sku + ': ' + e?.node?.name,
                value: e?.node?.entityId,
                payload: e?.node,
            })
        );

    const selectedProduct = value && {
        label: product?.sku + ': ' + product?.name,
        value: product?.entityId,
        payload: product,
    };

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
            options={productOptions}
            components={{ Option, SingleValue: Option }}
            id={id}
            value={disabled ? '' : selectedProduct}
            onChange={handleChange}
        />
    );
};

export default ProductId;
