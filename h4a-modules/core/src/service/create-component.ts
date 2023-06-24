import componentsPluginRequire from '@h4a/core/generated/plugin-components';
import {
    IDynamicComponent,
    IDynamicComponentProps,
} from '@h4a/core/interface/template-interface';
import { uuid } from 'uuidv4';

const createComponent = (type: string): IDynamicComponent => {
    const component = componentsPluginRequire(type);
    if (component === null) throw new Error(`Component ${type} not found`);

    const props: IDynamicComponentProps = {};

    if (component.schema.props) {
        for (const [propName, propSchema] of Object.entries(
            component.schema.props
        )) {
            if (propSchema.defaultValue === undefined) continue;

            props[propName] = propSchema.defaultValue;
        }
    }

    return {
        type,
        id: uuid(),
        props,
    };
};

export default createComponent;
