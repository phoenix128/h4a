import React from 'react';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import usePageTitle from '@h4a/ui/hooks/use-page-title';
import Section from '@h4a/ui/components/Section/Section';

interface IPageTitleProps extends IComponentProps {
    title?: string;
}

const PageTitle: React.FC<IPageTitleProps> = ({
    className = 'h4a-ui-page-title',
    title,
}) => {
    const realTitle = usePageTitle(title);

    return (
        <Section className={className} data-h4a-component="ui/page-title">
            <h1>{realTitle}</h1>
        </Section>
    );
};

export const PageTitleSchema: IComponentSchema = {
    title: 'PageTitle',
    maxChildren: 0,
};

export default PageTitle;
