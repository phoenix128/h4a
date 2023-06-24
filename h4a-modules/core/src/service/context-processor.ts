import { IPluginContextProcessor } from '@h4a/core/interface/plugin-interface';
import modules from '@h4a/core/generated/modules';
import contextProcessorPluginRequire from '@h4a/core/generated/plugin-context-processor';

/**
 * Run page context processor for all modules
 * @param context
 */
const contextProcessor: IPluginContextProcessor = async (context) => {
    for (const moduleName of modules) {
        const processor = contextProcessorPluginRequire(moduleName);
        if (processor === null) continue;

        await processor(context);
    }
};

export default contextProcessor;
