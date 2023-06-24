import { MultipleChoiceOption } from '@h4a/bigcommerce/generated/gql/graphql';

export type IProductOptionsMatrix = Record<number, number[]>;
const createProductOptionsFromMatrix = (matrix: IProductOptionsMatrix) => {
    const productOptions: MultipleChoiceOption[] = [];
    for (const [optionId, values] of Object.entries(matrix)) {
        const edges = values.map((valueId: number) => ({
            node: {
                entityId: valueId,
            },
        }));
        productOptions.push({
            entityId: Number(optionId),
            isVariantOption: true,
            values: {
                edges,
            },
        } as MultipleChoiceOption);
    }
    return productOptions;
};

export default createProductOptionsFromMatrix;
