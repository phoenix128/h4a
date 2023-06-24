import React, { useContext, useEffect } from 'react';
import { SimpleTreeItemWrapper } from '@h4a/dnd-kit-sortable-tree/ui/simple/SimpleTreeItemWrapper';
import componentsRequire from '@h4a/core/generated/plugin-components';
import useSerializedCallback from '@h4a/core/hooks/use-serialized-callback';
import { TreeItemComponentProps } from '@h4a/dnd-kit-sortable-tree/types';
import clsx from 'clsx';
import { PageBuilderContext } from '@h4a/core/components/PageBuilder/PageBuilder';

export type ITreeItemProps = any;

// eslint-disable-next-line react/display-name
const TreeItem = React.forwardRef<
    HTMLDivElement,
    TreeItemComponentProps<ITreeItemProps>
>((props, ref) => {
    const component = componentsRequire(props.item.payload.type)!;
    const { selectedItem, setSelectedItem } = useContext(PageBuilderContext);
    const selected = selectedItem?.id === props.item.id;

    const handleMouseDown = useSerializedCallback(() => {
        setSelectedItem(props.item.id === selectedItem?.id ? null : props.item);
    }, [props.item, selectedItem]);

    return (
        <SimpleTreeItemWrapper
            className={clsx(
                selected && 'h4a-page-builder-tree-item-wrapper-selected'
            )}
            onMouseDown={handleMouseDown}
            {...props}
            ref={ref}
        >
            <div className={'h4a-page-builder-tree-item'}>
                <div className={'h4a-page-builder-tree-item-name'}>
                    {component?.schema.title || props.item.payload.type}
                </div>
            </div>
        </SimpleTreeItemWrapper>
    );
});

export default TreeItem;
