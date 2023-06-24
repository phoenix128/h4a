import React from 'react';
import Link from 'next/link';
import usePaginationLinks from '@h4a/bigcommerce/hooks/use-pagination-links';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import Section from '@h4a/ui/components/Section/Section';
import H4aLink from '@h4a/core/components/H4aLink';

export interface IPaginationProps extends IComponentProps {
    totalPages: number;
    currentPage: number;
}

const Pagination: React.FC<IPaginationProps> = ({
    className = 'h4a-bigcommerce-pagination',
    currentPage,
    totalPages,
}) => {
    const paginationLinks = usePaginationLinks({
        currentPage,
        totalPages,
    });

    return (
        <Section
            className={className}
            data-h4a-component="bigcommerce/pagination"
        >
            <ul>
                {paginationLinks.map((link) => (
                    <li key={link.page}>
                        {!link.isCurrent && (
                            <H4aLink
                                areaMapping={false}
                                path={link.link}
                                data-h4a-page-n={link.page}
                            >
                                {link.page}
                            </H4aLink>
                        )}
                        {link.isCurrent && (
                            <span
                                data-h4a-page-n={link.page}
                                data-h4a-current="true"
                            >
                                {link.page}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </Section>
    );
};

export const PaginationSchema: IComponentSchema = {
    title: 'Pagination',
    maxChildren: 0,
};

export default Pagination;
