import { IDynamicComponent } from '@h4a/core/interface/template-interface';

const getComponentProps = (
    components: IDynamicComponent[],
    componentId: string
): Record<string, any> | null => {
    for (const component of components) {
        if (component.id === componentId) {
            return component.props ? component.props : null;
        }

        if (component.components) {
            const props = getComponentProps(component.components, componentId);
            if (props) {
                return props;
            }
        }
    }

    return null;
};

export default getComponentProps;
