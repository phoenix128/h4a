import path from 'path';
import process from 'process';
import yaml from 'js-yaml';
import fs from 'fs';

const environments: Record<string, any> = {};

const getEnvironments = (): any => {
    if (!environments.data) {
        const envFile = path.join(process.cwd(), 'environments.yml');
        console.log(`Loading environments.yml`);
        environments.data = yaml.load(fs.readFileSync(envFile, 'utf8'));
    }

    return environments.data;
};

export default getEnvironments;
