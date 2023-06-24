/* eslint-disable no-restricted-imports */

import { CodegenConfig } from '@graphql-codegen/cli';

const codegenConfig: CodegenConfig = {
    schema: {
        ['http://localhost:3000/graphql/%40h4a%2Fbigcommerce']: {
            headers: {
                'x-h4a-area': 'default',
            },
        },
    },
    generates: {
        './src/generated/gql/': {
            preset: 'client',
            plugins: [],
        },
    },
    ignoreNoDocuments: true,
    // documents: ['./src/graphql/gql/*.ts'],
};

export default codegenConfig;
