import React, { useCallback, useContext, useState } from 'react';
import { TemplateContext } from '@h4a/core/components/Template/Template';
import { SortableTree } from '@h4a/dnd-kit-sortable-tree/SortableTree';
import { IDynamicComponent } from '@h4a/core/interface/template-interface';
import TreeItemComponent from '@h4a/core/components/PageBuilder/Tree/TreeItem';
import componentsRequire from '@h4a/core/generated/plugin-components';
import { TreeItems, TreeItem } from '@h4a/dnd-kit-sortable-tree/types';

const treeItemsToComponents = (items: TreeItems<any>): IDynamicComponent[] => {
    return items.map((item) => {
        const { children, payload } = item;
        return {
            ...payload,
            components: children ? treeItemsToComponents(children) : [],
        };
    });
};

const componentsToTreeItems = (
    components: IDynamicComponent[]
): TreeItems<any> => {
    return components.map((item) => {
        const { components, ...other } = item;

        const component = componentsRequire(item.type as string);
        const base: TreeItem<any> = {
            id: other.id,
            payload: other,
            children: components ? componentsToTreeItems(components) : [],
        };

        if (!component) return base;

        return {
            ...base,
            canHaveChildren:
                component.schema.maxChildren === -1 ||
                component.schema.maxChildren > (item.components?.length || 0),
        };
    });
};

const Tree: React.FC = () => {
    const { components, setComponents } = useContext(TemplateContext);

    const handleItemsChanged = useCallback(
        (newItems: any[]) => {
            setComponents(treeItemsToComponents(newItems));
        },
        [setComponents]
    );

    return (
        <SortableTree
            items={componentsToTreeItems(components)}
            onItemsChanged={handleItemsChanged}
            TreeItemComponent={TreeItemComponent}
        />
    );
};

export default Tree;
