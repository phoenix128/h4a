import { IDynamicComponent } from '@h4a/core/interface/template-interface';

const removeComponent = (
    componentsIn: IDynamicComponent[],
    componentId: string
) => {
    const components = JSON.parse(JSON.stringify(componentsIn));

    for (let i = 0; i < components.length; i++) {
        if (components[i].id === componentId) {
            components.splice(i, 1);
            break;
        }

        if (components[i].components) {
            components[i].components = removeComponent(
                components[i].components,
                componentId
            );
        }
    }

    return components;
};

export default removeComponent;
