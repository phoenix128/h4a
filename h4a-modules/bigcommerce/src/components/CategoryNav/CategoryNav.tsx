'use client';

import React from 'react';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import Section from '@h4a/ui/components/Section/Section';
import useCategoryTree from '@h4a/bigcommerce/hooks/use-category-tree';
import CategoryTreeItem from '@h4a/bigcommerce/components/CategoryNav/CategoryTreeItem';

interface ICategoryNavProps extends IComponentProps {}

const CategoryNav: React.FC<ICategoryNavProps> = ({
    className = 'h4a-bigcommerce-category-nav',
}: ICategoryNavProps) => {
    const { data } = useCategoryTree();
    const categoryTree = data?.site.categoryTree;

    return (
        <Section
            className={className}
            data-h4a-component="bigcommerce/category-nav"
        >
            <ul>
                {categoryTree?.map((treeItem: any) => {
                    return (
                        <li key={treeItem.entityId}>
                            <CategoryTreeItem treeItem={treeItem} />
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
};

export const CategoryNavSchema: IComponentSchema = {
    title: 'Category Navigation',
    maxChildren: 0,
};

export default CategoryNav;
