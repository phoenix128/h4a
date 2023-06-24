'use client';

import React, { PropsWithChildren, Children } from 'react';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import clsx from 'clsx';
import Range from '@h4a/core/components/PageBuilder/OptionsFields/Range';

interface IColumnsProps extends IComponentProps {
    columns?: number;
    mdColumns?: number;
    smColumns?: number;
}

const Grid: React.FC<PropsWithChildren<IColumnsProps>> = ({
    className = 'h4a-ui-grid',
    children,
    columns = GridSchema.props!.columns.defaultValue,
    mdColumns = GridSchema.props!.mdColumns.defaultValue,
    smColumns = GridSchema.props!.smColumns.defaultValue,
}) => {
    if (columns === undefined) {
        columns = Children.toArray(children).length;
    }

    const classes = [className];

    classes.push('lg:grid-cols-' + columns);
    if (mdColumns) {
        classes.push('md:grid-cols-' + mdColumns);
    }

    classes.push('grid-cols-' + smColumns);

    return (
        <div className={clsx(classes)} data-h4a-component="ui/grid">
            {children}
        </div>
    );
};

export const GridSchema: IComponentSchema = {
    title: 'Grid',
    maxChildren: -1,
    props: {
        columns: {
            title: 'Columns',
            component: Range,
            defaultValue: 2,
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

export default Grid;
