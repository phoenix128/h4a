import usePageContext from '@h4a/core/hooks/use-page-context';

const usePageUri = () => {
    const ctx = usePageContext();
    const url = new URL(ctx.pageUri || '', 'http://a');

    return url.pathname + url.search;
};

export default usePageUri;
