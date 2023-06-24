import { useContext } from 'react';
import { PageBuilderContext } from '@h4a/core/components/PageBuilder/PageBuilder';
import componentsRequire from '@h4a/core/generated/plugin-components';

const useSelectedComponent = () => {
    const { selectedItem } = useContext(PageBuilderContext);
    return selectedItem?.payload.type
        ? componentsRequire(selectedItem.payload.type)
        : null;
};

export default useSelectedComponent;
