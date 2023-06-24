import clsx from 'clsx';
import React, { forwardRef } from 'react';
import type {
    TreeItemComponentType,
    TreeItemComponentProps,
} from '@h4a/dnd-kit-sortable-tree/types';
import '@h4a/dnd-kit-sortable-tree/ui/simple/SimpleTreeItemWrapper.css';

export const SimpleTreeItemWrapper: TreeItemComponentType<{}, HTMLDivElement> =
    // eslint-disable-next-line react/display-name
    forwardRef<
        HTMLDivElement,
        React.PropsWithChildren<TreeItemComponentProps<{}>>
    >((props, ref) => {
        const {
            clone,
            depth,
            disableSelection,
            disableInteraction,
            disableSorting,
            ghost,
            handleProps,
            indentationWidth,
            indicator,
            collapsed,
            onCollapse,
            onRemove,
            item,
            wrapperRef,
            style,
            hideCollapseButton,
            childCount,
            manualDrag,
            showDragHandle,
            disableCollapseOnItemClick,
            onMouseDown,
            isLast,
            parent,
            className,
            contentClassName,
            ...rest
        } = props;

        return (
            <li
                onMouseDown={onMouseDown}
                ref={wrapperRef}
                {...rest}
                className={clsx(
                    'dnd-sortable-tree_simple_wrapper',
                    clone && 'dnd-sortable-tree_simple_clone',
                    ghost && 'dnd-sortable-tree_simple_ghost',
                    disableSelection &&
                        'dnd-sortable-tree_simple_disable-selection',
                    disableInteraction &&
                        'dnd-sortable-tree_simple_disable-interaction',
                    className
                )}
                style={{
                    ...style,
                    paddingLeft: clone
                        ? indentationWidth
                        : indentationWidth * depth,
                }}
            >
                <div
                    className={clsx(
                        'dnd-sortable-tree_simple_tree-item',
                        contentClassName
                    )}
                    ref={ref}
                    {...(manualDrag ? undefined : handleProps)}
                    onClick={
                        disableCollapseOnItemClick ? undefined : onCollapse
                    }
                >
                    {!disableSorting && showDragHandle !== false && (
                        <div
                            className={'dnd-sortable-tree_simple_handle'}
                            {...handleProps}
                        />
                    )}
                    {!manualDrag &&
                        !hideCollapseButton &&
                        !!onCollapse &&
                        !!childCount && (
                            <button
                                onClick={(e) => {
                                    if (!disableCollapseOnItemClick) {
                                        return;
                                    }
                                    e.preventDefault();
                                    onCollapse?.();
                                }}
                                className={clsx(
                                    'dnd-sortable-tree_simple_tree-item-collapse_button',
                                    collapsed &&
                                        'dnd-sortable-tree_folder_simple-item-collapse_button-collapsed'
                                )}
                            />
                        )}
                    {props.children}
                </div>
            </li>
        );
    });
