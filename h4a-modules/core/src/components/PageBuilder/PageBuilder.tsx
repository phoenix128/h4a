import React, { createContext, useEffect, useRef, useState } from 'react';
import Tree from '@h4a/core/components/PageBuilder/Tree';
import HighlightBox from '@h4a/core/components/PageBuilder/HighlightBox';
import { ITreeItemProps } from '@h4a/core/components/PageBuilder/Tree/TreeItem';
import ComponentOptionsFields from '@h4a/core/components/PageBuilder/ComponentOptions';
import AddComponent from '@h4a/core/components/PageBuilder/AddComponent';
import ComponentActions from '@h4a/core/components/PageBuilder/ComponentOptions/ComponentActions';
import ComponentName from '@h4a/core/components/PageBuilder/ComponentOptions/ComponentName';
import { IDynamicComponent } from '@h4a/core/interface/template-interface';
import usePageContext from '@h4a/core/hooks/use-page-context';

interface IPageBuilderProps {
    components: IDynamicComponent[];
}

interface IPageBuilderContext {
    selectedItem: ITreeItemProps | null;
    setSelectedItem: (item: ITreeItemProps | null) => void;
}

export const PageBuilderContext = createContext<IPageBuilderContext>(
    {} as IPageBuilderContext
);

const getRawUri = (url: string) => {
    const [path, queryString] = url.split('?');
    const queryParams = new URLSearchParams(queryString);
    queryParams.delete('_pb');
    let newRelativeUrl = path;
    if (queryParams.toString()) {
        newRelativeUrl += '?' + queryParams.toString();
    }

    return newRelativeUrl;
};

const PageBuilder: React.FC<IPageBuilderProps> = ({ components }) => {
    const [selectedItem, setSelectedItem] = useState<ITreeItemProps>(null);
    const { pageUri } = usePageContext();
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Send components update to template page
    useEffect(() => {
        if (iframeRef && iframeRef.current) {
            iframeRef?.current?.contentWindow?.postMessage(
                { type: 'h4a-builder-components', components },
                '*'
            );
        }
    }, [components, iframeRef]);

    // Send components selection to template page
    useEffect(() => {
        if (iframeRef && iframeRef.current) {
            iframeRef?.current?.contentWindow?.postMessage(
                { type: 'h4a-builder-highlight-component', selectedItem },
                '*'
            );
        }
    }, [selectedItem, iframeRef]);

    return (
        <PageBuilderContext.Provider
            value={{
                selectedItem,
                setSelectedItem,
            }}
        >
            <div className={'h4a-page-builder'}>
                <div className={'h4a-page-builder-tree'}>
                    <Tree />
                    <AddComponent />
                </div>
                <div className={'h4a-page-builder-content'}>
                    <iframe
                        src={getRawUri(pageUri)}
                        ref={iframeRef}
                        className={'h4a-page-builder-content-inner'}
                    />
                </div>
                <div className={'h4a-page-builder-options'}>
                    <ComponentName />
                    <ComponentOptionsFields />
                    <ComponentActions />
                </div>
            </div>
        </PageBuilderContext.Provider>
    );
};

export default PageBuilder;
