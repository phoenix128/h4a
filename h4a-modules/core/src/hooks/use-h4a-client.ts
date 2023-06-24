import usePageContext from '@h4a/core/hooks/use-page-context';
import getApolloClient from '@h4a/core/service/get-apollo-client';

const useH4aClient = (module: string) => {
    const ctx = usePageContext();
    return getApolloClient(module, ctx);
};

export default useH4aClient;
