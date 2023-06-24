import usePageContext from '@h4a/core/hooks/use-page-context';

const useMapPath = (path: string) => {
    const ctx = usePageContext();
    return ctx.basePath + path?.replace(/^\//, '');
};

export default useMapPath;
