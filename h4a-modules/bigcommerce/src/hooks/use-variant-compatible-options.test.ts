import { renderHook } from '@testing-library/react';
import useVariantCompatibleOptions, {
    IProductOptionsState,
} from '@h4a/bigcommerce/hooks/use-variant-compatible-options';
import {
    MultipleChoiceOption,
    ProductOptionValueEdge,
    Variant,
} from '@h4a/bigcommerce/generated/gql/graphql';
import createProductOptionsFromMatrix, {
    IProductOptionsMatrix,
} from '@h4a/bigcommerce/libs/test/create-product-options-from-matrix';
import createProductVariantsFromMatrix, {
    IProductVariantsMatrix,
} from '@h4a/bigcommerce/libs/test/create-product-variants-from-matrix';

describe('useVariantCompatibleOptions', () => {
    it('Should filter non purchasable options', () => {
        const productOptionsMatrix: IProductOptionsMatrix = {
            10: [101, 102, 103],
            20: [201, 202, 203],
            30: [301, 302, 303],
        };

        const productVariantsMatrix: IProductVariantsMatrix = {
            1000: [false, { 10: 101, 20: 201, 30: 301 }],
            1001: [false, { 10: 101, 20: 201, 30: 302 }],
            1002: [false, { 10: 101, 20: 201, 30: 303 }],

            1003: [false, { 10: 101, 20: 202, 30: 301 }],
            1004: [true, { 10: 101, 20: 202, 30: 302 }],
            1005: [false, { 10: 101, 20: 202, 30: 303 }],

            1006: [true, { 10: 101, 20: 203, 30: 301 }],
            1007: [false, { 10: 101, 20: 203, 30: 302 }],
            1008: [false, { 10: 101, 20: 203, 30: 303 }],

            1009: [false, { 10: 102, 20: 201, 30: 301 }],
            1010: [true, { 10: 102, 20: 201, 30: 302 }],
            1011: [true, { 10: 102, 20: 201, 30: 303 }],

            1012: [true, { 10: 102, 20: 202, 30: 301 }],
            1013: [false, { 10: 102, 20: 202, 30: 302 }],
            1014: [true, { 10: 102, 20: 202, 30: 303 }],

            1015: [false, { 10: 102, 20: 203, 30: 301 }],
            1016: [true, { 10: 102, 20: 203, 30: 302 }],
            1017: [false, { 10: 102, 20: 203, 30: 303 }],

            1018: [false, { 10: 103, 20: 201, 30: 301 }],
            1019: [true, { 10: 103, 20: 201, 30: 302 }],
            1020: [true, { 10: 103, 20: 201, 30: 303 }],

            1021: [false, { 10: 103, 20: 202, 30: 301 }],
            1022: [false, { 10: 103, 20: 202, 30: 302 }],
            1023: [true, { 10: 103, 20: 202, 30: 303 }],

            1024: [false, { 10: 103, 20: 203, 30: 301 }],
            1025: [true, { 10: 103, 20: 203, 30: 302 }],
            1026: [false, { 10: 103, 20: 203, 30: 303 }],
        };

        const productOptions =
            createProductOptionsFromMatrix(productOptionsMatrix);
        const variants = createProductVariantsFromMatrix(productVariantsMatrix);

        const testCases: [IProductOptionsState, Record<number, number[]>][] = [
            [
                {
                    10: 101,
                },
                {
                    10: [101, 102, 103],
                    20: [202, 203],
                    30: [301, 302],
                },
            ],
            [
                {
                    10: 101,
                    20: 201,
                },
                {
                    10: [102, 103],
                    20: [202, 203],
                    30: [],
                },
            ],
            [
                {
                    10: 102,
                    20: 202,
                },
                {
                    10: [101, 102, 103],
                    20: [201, 202, 203],
                    30: [301, 303],
                },
            ],
        ];

        for (const testCase of testCases) {
            const { result } = renderHook(() =>
                useVariantCompatibleOptions(
                    variants,
                    productOptions,
                    testCase[0]
                )
            );

            expect(result.current).toEqual(testCase[1]);
        }
    });

    it('Should ignore non-variant options', () => {
        const productOptionsMatrix: IProductOptionsMatrix = {
            10: [101, 102],
            20: [201, 202],
        };

        const productVariantsMatrix: IProductVariantsMatrix = {
            1000: [true, { 10: 101, 20: 201 }],
            1001: [true, { 10: 101, 20: 202 }],
            1002: [true, { 10: 102, 20: 201 }],
            1003: [true, { 10: 102, 20: 202 }],
        };

        const productOptions: MultipleChoiceOption[] = [
            ...createProductOptionsFromMatrix(productOptionsMatrix),
            {
                isVariantOption: false,
                entityId: 30,
                values: {
                    edges: [
                        {
                            node: {
                                entityId: 301,
                            },
                        },
                        {
                            node: {
                                entityId: 302,
                            },
                        },
                    ] as ProductOptionValueEdge[],
                },
            } as MultipleChoiceOption,
        ];
        const variants = createProductVariantsFromMatrix(productVariantsMatrix);

        const testCase: IProductOptionsState = {
            10: 101,
        };
        const { result } = renderHook(() =>
            useVariantCompatibleOptions(variants, productOptions, testCase)
        );

        expect(result.current).toEqual({
            10: [101, 102],
            20: [201, 202],
        });
    });

    it('Should filter out of stock options if settings are configured to hide them', () => {
        expect(true).toEqual(false);
    });
});
