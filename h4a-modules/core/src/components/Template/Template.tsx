'use client';

import React, { createContext, useEffect, useRef, useState } from 'react';
import {
    IDynamicComponent,
    ITemplate,
} from '@h4a/core/interface/template-interface';
import DynamicComponent from '@h4a/core/components/DynamicComponent';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import getTranslations from '@h4a/core/libs/get-translations';
import Root from '@h4a/core/components/Root';
import { IPluginPageContext } from '@h4a/core/interface/plugin-interface';
import PageContextProvider from '@h4a/core/context/PageContextProvider';
import ContextProviders from '@h4a/core/context/ContextProviders';
import PageBuilder from '@h4a/core/components/PageBuilder';
import { useEventListener } from 'usehooks-ts';
import HighlightBox from '@h4a/core/components/PageBuilder/HighlightBox';

interface ITemplateProps {
    template: ITemplate;
    context: IPluginPageContext;
}

i18n.use(initReactI18next).init({
    resources: getTranslations(),
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

interface ITemplateContext {
    components: IDynamicComponent[];
    setComponents: (components: IDynamicComponent[]) => void;
    selectedComponent?: IDynamicComponent;
    setSelectedDomElement?: (element: HTMLDivElement) => void;
    selectedDomElement?: HTMLDivElement;
}

export const TemplateContext = createContext<ITemplateContext>(
    {} as ITemplateContext
);

const Template: React.FC<ITemplateProps> = (props) => {
    const [selectedComponent, setSelectedComponent] = useState<
        IDynamicComponent | undefined
    >(undefined);
    const [selectedDomElement, setSelectedDomElement] =
        useState<HTMLDivElement>();

    const {
        template: { components: initialComponents },
        context,
    } = props;

    const {
        pageProps: { searchParams },
        pageUri,
    } = context;

    // Receive components update from pagebuilder
    useEventListener('message', (event: any) => {
        if (event.data && event.data.type === 'h4a-builder-components') {
            setComponents(event.data.components);
        }
    });

    // Send update to page builder when page changes
    useEffect(() => {
        window?.parent?.postMessage(
            { type: 'h4a-builder-components', components: initialComponents },
            '*'
        );
    }, [initialComponents, pageUri]);

    // Receive component selection from pagebuilder
    useEventListener('message', (event: any) => {
        if (
            event.data &&
            event.data.type === 'h4a-builder-highlight-component'
        ) {
            const { selectedItem } = event.data;
            setSelectedComponent(selectedItem?.payload || null);
        }
    });

    const [components, setComponents] = useState(initialComponents);

    // Page builder mode
    if (searchParams._pb) {
        return (
            <TemplateContext.Provider
                value={{
                    components,
                    setComponents,
                }}
            >
                <PageContextProvider context={context}>
                    <ContextProviders>
                        <PageBuilder components={components} />
                    </ContextProviders>
                </PageContextProvider>
            </TemplateContext.Provider>
        );
    }

    // Default mode
    return (
        <TemplateContext.Provider
            value={{
                components,
                setComponents,
                selectedComponent,
                setSelectedDomElement,
                selectedDomElement,
            }}
        >
            <PageContextProvider context={context}>
                <ContextProviders>
                    <DynamicComponent
                        id={'root'}
                        type={Root}
                        components={components}
                    />
                    <HighlightBox />
                </ContextProviders>
            </PageContextProvider>
        </TemplateContext.Provider>
    );
};

export default Template;
