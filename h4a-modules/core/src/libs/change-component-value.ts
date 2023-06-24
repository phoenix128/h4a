import { IDynamicComponent } from '@h4a/core/interface/template-interface';
import deepCopy from '@h4a/core/libs/deep-copy';

const changeComponentValue = (
    components: IDynamicComponent[],
    componentId: string,
    propId: string,
    value: any
): IDynamicComponent[] => {
    const componentsCopy = deepCopy(components);

    for (const component of componentsCopy) {
        if (component.id === componentId) {
            if (!component.props) component.props = {};
            component.props[propId] = value;
            return componentsCopy;
        }

        if (component.components) {
            component.components = changeComponentValue(
                component.components,
                componentId,
                propId,
                value
            );
        }
    }

    return componentsCopy;
};

export default changeComponentValue;
