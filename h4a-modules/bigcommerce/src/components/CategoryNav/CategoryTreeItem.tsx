import { IComponentProps } from '@h4a/core/interface/component-interface';
import React from 'react';
import H4aLink from '@h4a/core/components/H4aLink';

interface ICategoryTreeItemProps extends IComponentProps {
    treeItem: any;
}

const CategoryTreeItem: React.FC<ICategoryTreeItemProps> = ({ treeItem }) => {
    return <H4aLink path={treeItem!.path}>{treeItem?.name}</H4aLink>;
};

export default CategoryTreeItem;
