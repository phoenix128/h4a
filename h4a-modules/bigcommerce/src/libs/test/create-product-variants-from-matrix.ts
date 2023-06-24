import { Variant } from '@h4a/bigcommerce/generated/gql/graphql';

export type IProductVariantsMatrix = Record<
    number,
    [boolean, Record<number, number>]
>;

const createProductVariantsFromMatrix = (matrix: IProductVariantsMatrix) => {
    const variants: Variant[] = [];
    for (const [variantId, variantConf] of Object.entries(matrix)) {
        const [isPurchasable, options] = variantConf;
        const edges = Object.entries(options).map(([optionId, valueId]) => {
            return {
                node: {
                    entityId: Number(optionId),
                    values: {
                        edges: [
                            {
                                node: {
                                    entityId: valueId,
                                },
                            },
                        ],
                    },
                },
            };
        });

        variants.push({
            entityId: Number(variantId),
            isPurchasable,
            options: {
                edges,
            },
        } as Variant);
    }

    return variants;
};
export default createProductVariantsFromMatrix;
