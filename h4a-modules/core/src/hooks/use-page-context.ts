import { useContext } from 'react';
import { IPluginPageContext } from '@h4a/core/interface/plugin-interface';
import { PageContext } from '@h4a/core/context/PageContextProvider';

const usePageContext = (): IPluginPageContext => {
    const pageContext = useContext(PageContext); // Used in pages routing

    return pageContext?.context;
};

export default usePageContext;
