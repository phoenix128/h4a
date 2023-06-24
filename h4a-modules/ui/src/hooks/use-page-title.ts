import usePageContextVariable from '@h4a/core/hooks/use-page-context-variable';

const usePageTitle = (pageTitle?: string): string | null =>
    usePageContextVariable<string>(pageTitle, 'pageTitle') || 'Untitled Page';

export default usePageTitle;
