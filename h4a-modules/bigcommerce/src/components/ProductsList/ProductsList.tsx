'use client';

import React from 'react';
import ProductCard from '@h4a/bigcommerce/components/ProductCard/ProductCard';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import Section from '@h4a/ui/components/Section/Section';
import usePageContextVariable from '@h4a/core/hooks/use-page-context-variable';
import ProductsIds from '@h4a/bigcommerce/components/PageBuilder/OptionsFields/ProductsIds';
import Range from '@h4a/core/components/PageBuilder/OptionsFields/Range';
import clsx from 'clsx';

interface IProductsListProps extends IComponentProps {
    productIds: number[];
    columns?: number;
    mdColumns?: number;
    smColumns?: number;
}

const ProductsList: React.FC<IProductsListProps> = ({
    productIds,
    className = 'h4a-bigcommerce-products-list',
    columns = ProductsListSchema.props!.columns.defaultValue,
    mdColumns = ProductsListSchema.props!.mdColumns.defaultValue,
    smColumns = ProductsListSchema.props!.smColumns.defaultValue,
}) => {
    const realProductIds =
        usePageContextVariable<number[]>(productIds, 'products.entityId') || [];
    if (!realProductIds?.length) return null;

    const gridClasses = [className];

    gridClasses.push('lg:grid-cols-' + columns);
    if (mdColumns) {
        gridClasses.push('md:grid-cols-' + mdColumns);
    }

    gridClasses.push('grid-cols-' + smColumns);

    return (
        <Section
            className={className}
            data-h4a-component="bigcommerce/products-list"
        >
            <ul className={clsx(gridClasses)}>
                {realProductIds.map((productId, idx) => {
                    return (
                        <li key={productId}>
                            <ProductCard productId={productId} />
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
};

export const ProductsListSchema: IComponentSchema = {
    title: 'Products List',
    maxChildren: 0,
    props: {
        productIds: {
            title: 'Products',
            contextVariable: 'products.entityId',
            component: ProductsIds,
        },
        columns: {
            title: 'Columns',
            component: Range,
            defaultValue: 4,
            settings: {
                min: 1,
                max: 12,
            },
        },
        mdColumns: {
            title: 'Columns (md)',
            component: Range,
            defaultValue: 2,
            settings: {
                min: 1,
                max: 12,
            },
        },
        smColumns: {
            title: 'Columns (sm)',
            component: Range,
            defaultValue: 1,
            settings: {
                min: 1,
                max: 12,
            },
        },
    },
};

export default ProductsList;
