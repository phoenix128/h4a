import modules from '@h4a/core/generated/modules';
import pluginComponentsByModule from '@h4a/core/generated/plugin-components-by-module';
import { IPluginComponentData } from '@h4a/core/interface/plugin-interface';

interface IComponentsListItem {
    moduleName: string;
    componentName: string;
    componentData: IPluginComponentData;
}

type IComponentsList = IComponentsListItem[];

const componentsList: IComponentsList = [];

const getBuilderComponentsList = (): IComponentsList => {
    if (componentsList.length === 0) {
        const res = [];
        for (const moduleName of modules) {
            const components = pluginComponentsByModule(moduleName);

            if (components === null) {
                continue;
            }

            for (const [componentName, componentData] of Object.entries(
                components
            )) {
                componentsList.push({
                    moduleName,
                    componentName: `${moduleName}:${componentName}`,
                    componentData,
                });
            }
        }
    }

    return componentsList;
};

export default getBuilderComponentsList;
