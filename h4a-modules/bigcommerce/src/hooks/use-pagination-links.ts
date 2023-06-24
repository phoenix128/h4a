import usePageContextVariable from '@h4a/core/hooks/use-page-context-variable';
import usePageUri from '@h4a/core/hooks/use-page-uri';

interface IPagination {
    currentPage: number;
    totalPages: number;
}

interface IPaginationLink {
    page: number;
    isCurrent: boolean;
    link: string;
}

const usePaginationLinks = (pagination: IPagination): IPaginationLink[] => {
    const totalPages =
        usePageContextVariable(
            pagination.totalPages,
            'pagination.totalPages'
        ) || 1;
    const currentPage =
        usePageContextVariable(
            pagination.currentPage,
            'pagination.currentPage'
        ) || 1;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const currentUri = usePageUri();

    return pages.map((i) => {
        const url = new URL(currentUri, 'http://a');
        url.searchParams.set('page', i.toString());

        return {
            isCurrent: i === currentPage,
            page: i,
            link: url.pathname + url.search,
        };
    });
};

export default usePaginationLinks;
