import type { Transform } from '@graphql-tools/delegate';
import { FieldNode, Kind, visit } from 'graphql/index';
import { ExecutionRequest, ExecutionResult } from '@graphql-tools/utils';
import { print, parse } from 'graphql';
import { DelegationContext } from '@graphql-tools/delegate';
import extractRequestFragments from '@h4a/bigcommerce/libs/extract-request-fragments';

class ProductsListTransformer implements Transform {
    private entityIds: number[];

    constructor(entityIds: number[]) {
        this.entityIds = entityIds;
    }
    transformRequest(request: ExecutionRequest) {
        let selection: FieldNode | null = null;
        visit(request.document, {
            [Kind.FIELD]: {
                enter: (node) => {
                    if (node.name.value === 'site' && selection === null) {
                        selection = node.selectionSet
                            ?.selections[0] as FieldNode;
                    }

                    return node;
                },
            },
        });

        const fragmentsString = extractRequestFragments(
            request.document,
            request.info!
        );

        // Forward the query to the upstream schema
        const transformedDocument = `
            ${fragmentsString}
            query ProductsByIds {
                site {
                    products(entityIds: ${JSON.stringify(
                        this.entityIds
                    )}, first: ${this.entityIds.length}) {
                        edges {
                            node {
                                ${selection ? print(selection) : '__typename'}
                            }
                        }
                    }
                }
            }    
        `;

        const newDocument = parse(transformedDocument);
        return { ...request, document: newDocument };
    }

    transformSchema(schema: any) {
        return schema;
    }

    transformResult(result: ExecutionResult, delegation: DelegationContext) {
        const value = result.data.site.products.edges.map(
            (edge: any) => edge.node
        );
        return { ...result, data: { [delegation.fieldName]: value } };
    }
}

export { ProductsListTransformer };
