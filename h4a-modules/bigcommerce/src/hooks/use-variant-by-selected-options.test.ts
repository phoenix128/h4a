import { renderHook } from '@testing-library/react';
import { IProductOptionsState } from '@h4a/bigcommerce/hooks/use-variant-compatible-options';
import createProductOptionsFromMatrix, {
    IProductOptionsMatrix,
} from '@h4a/bigcommerce/libs/test/create-product-options-from-matrix';
import createProductVariantsFromMatrix, {
    IProductVariantsMatrix,
} from '@h4a/bigcommerce/libs/test/create-product-variants-from-matrix';
import useVariantBySelectedOptions from '@h4a/bigcommerce/hooks/use-variant-by-selected-options';

describe('useVariantBySelectedOptions', () => {
    it('Should return the selected variant', () => {
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

        const testCases: [IProductOptionsState, number | undefined][] = [
            [
                {
                    10: 101,
                },
                undefined,
            ],
            [
                {
                    10: 101,
                    20: 201,
                },
                undefined,
            ],
            [
                {
                    10: 101,
                    20: 203,
                    30: 301,
                },
                1006,
            ],
            [
                {
                    10: 103,
                    20: 203,
                    30: 302,
                },
                1025,
            ],
            [
                {
                    10: 103,
                    20: 203,
                    30: 302,
                    99: 100,
                },
                1025,
            ],
            [
                {
                    10: 103,
                    30: 302,
                    99: 100,
                },
                undefined,
            ],
        ];

        for (const testCase of testCases) {
            const { result } = renderHook(() =>
                useVariantBySelectedOptions(variants, testCase[0])
            );

            expect(result.current?.entityId).toEqual(testCase[1]);
        }
    });
});
