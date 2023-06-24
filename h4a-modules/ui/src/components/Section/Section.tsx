import React, { PropsWithChildren } from 'react';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import ColumnsSize from '@h4a/ui/components/PageBuilder/OptionsFields/ColumnsSize';
import clsx from 'clsx';
import Direction from '@h4a/ui/components/PageBuilder/OptionsFields/Direction';

interface ISectionProps extends IComponentProps {
    ['data-h4a-component']?: string;
    width?: string;
    direction?: string;
}

const Section: React.FC<PropsWithChildren<ISectionProps>> = ({
    className = 'h4a-ui-section',
    children,
    'data-h4a-component': dataH4aComponent = 'ui/section',
    width = SectionSchema.props!.width.defaultValue,
    direction = SectionSchema.props!.direction.defaultValue,
    ...props
}) => {
    return (
        <section
            className={clsx(className, width, 'flex', direction, 'mx-auto')}
            data-h4a-component={dataH4aComponent}
            {...props}
        >
            {children}
        </section>
    );
};

export const SectionSchema: IComponentSchema = {
    title: 'Section',
    maxChildren: -1,
    props: {
        direction: {
            defaultValue: 'flex-col',
            title: 'Direction',
            component: Direction,
        },
        width: {
            defaultValue: 'w-full',
            title: 'Width',
            component: ColumnsSize,
        },
    },
};

export default Section;
