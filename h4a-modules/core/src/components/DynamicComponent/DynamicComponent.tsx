import React, { useContext, useEffect, useRef } from 'react';
import { IDynamicComponent } from '@h4a/core/interface/template-interface';
import replaceVariables from '@h4a/core/libs/replace-variables';
import componentsRequire from '@h4a/core/generated/plugin-components';
import MissingComponent from '@h4a/core/components/MissingComponent';
import usePageContext from '@h4a/core/hooks/use-page-context';
import { TemplateContext } from '@h4a/core/components/Template/Template';

interface IDynamicComponentProps extends IDynamicComponent {}

const DynamicComponent: React.FC<IDynamicComponentProps> = (
    props: IDynamicComponentProps
) => {
    const { type, components, id, ...otherProps } = props;
    const ctx = usePageContext();
    const domElement = useRef<HTMLDivElement>(null);
    const { selectedComponent, setSelectedDomElement, selectedDomElement } =
        useContext(TemplateContext);

    useEffect(() => {
        if (domElement.current === null || selectedComponent?.id !== id) return;

        setSelectedDomElement && setSelectedDomElement(domElement.current);
    }, [id, selectedComponent, selectedDomElement, setSelectedDomElement]);

    const Component =
        typeof type === 'string' ? componentsRequire(type)?.component : type;
    if (Component === null || Component === undefined)
        return <MissingComponent type={type} />;

    const subComponents = components?.map((component: IDynamicComponent) => {
        const translatedProps = replaceVariables(component.props || {}, ctx);

        return (
            <DynamicComponent
                key={component.id}
                id={component.id}
                type={component.type}
                components={component.components || []}
                {...translatedProps}
            />
        );
    });

    // @ts-ignore
    return (
        <div ref={domElement}>
            <Component {...otherProps}>{subComponents}</Component>
        </div>
    );
};

export default DynamicComponent;
