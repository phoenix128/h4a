import React, {
    useCallback,
    useContext,
    useLayoutEffect,
    useState,
} from 'react';
import { TemplateContext } from '@h4a/core/components/Template/Template';
import { useInterval, useSsr, useWindowSize } from 'usehooks-ts';
import componentsRequire from '@h4a/core/generated/plugin-components';

interface IHighlightBoxProps {}

const HighlightBox: React.FC<IHighlightBoxProps> = () => {
    const [style, setStyle] = useState<React.CSSProperties>({
        display: 'none',
    });
    const { components, selectedDomElement, selectedComponent } =
        useContext(TemplateContext);
    const { isBrowser } = useSsr();
    const { width, height } = useWindowSize();
    const component = selectedComponent?.type
        ? componentsRequire('' + selectedComponent.type)!
        : null;

    const updateHighlightBox = useCallback(
        (scrollTo: boolean) => {
            if (!isBrowser) return;

            if (!selectedDomElement || !selectedComponent) {
                setStyle({ display: 'none' });
                return;
            }

            const { width, height } =
                selectedDomElement.getBoundingClientRect();

            setStyle({
                display: 'block',
                top: `${selectedDomElement.offsetTop}px`,
                left: `${selectedDomElement.offsetLeft}px`,
                width: `${width - 1}px`,
                height: `${height - 1}px`,
            });

            if (scrollTo) {
                selectedDomElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        },
        [
            isBrowser,
            components,
            width,
            height,
            selectedComponent,
            selectedDomElement,
        ]
    );

    useLayoutEffect(() => {
        updateHighlightBox(true);
    }, [updateHighlightBox]);
    useInterval(() => {
        updateHighlightBox(false);
    }, 500);

    return (
        <div className={'h4a-builder-component-highlight'} style={style}>
            <div className={'h4a-builder-component-highlight-title'}>
                {component?.schema.title}
            </div>
        </div>
    );
};

export default HighlightBox;
