import fs from 'fs';
import path from 'path';
import fsPromises from 'fs/promises';
import '@h4a/core/libs/assert-server-side';
import { ITemplate } from '@h4a/core/interface/template-interface';

/**
 * Get template from file path
 * @param template
 */
const getTemplateByName = async (
    template: string | string[]
): Promise<ITemplate> => {
    const basePath = [process.cwd(), 'h4a', 'templates'];

    const filePath =
        (template instanceof Array
            ? path.join(...basePath, ...template)
            : path.join(...basePath, template)) + '.h4a.json';

    if (!fs.existsSync(filePath)) {
        throw new Error(`Template ${filePath} not found`);
    }

    try {
        const jsonData = await fsPromises.readFile(filePath);
        return JSON.parse('' + jsonData);
    } catch (e) {
        throw new Error(`Template ${filePath} is not valid JSON`);
    }
};

export default getTemplateByName;
