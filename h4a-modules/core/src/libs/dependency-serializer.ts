import { DependencyList } from 'react';

const dependencySerializer = (
    dependencies?: DependencyList
): DependencyList | undefined => {
    return dependencies?.map((dependency) => {
        if (typeof dependency === 'function') {
            return dependency;
        }

        return JSON.stringify(dependency);
    });
};

export default dependencySerializer;
