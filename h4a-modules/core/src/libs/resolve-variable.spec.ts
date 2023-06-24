import 'jest';
import resolveVariable from '@h4a/core/libs/resolve-variable';

describe('Resolve Variable', () => {
    it('Should resolve variable', () => {
        const source = {
            my_title: 'Title',
            my_description: 'Description',
        };

        const variable = 'my_title';
        expect(resolveVariable(variable, source)).toEqual('Title');
    });

    it('Should handle undefined values variable', () => {
        const source = {
            my_title: 'Title',
            my_description: 'Description',
        };

        const variable = 'unknown_variable';
        expect(resolveVariable(variable, source)).toBeUndefined();
    });

    it('Should handle undefined value in nested variable', () => {
        const source = {
            my_title: 'Title',
            my_description: 'Description',
        };

        const variable = 'unknown_variable.other';
        expect(resolveVariable(variable, source)).toBeUndefined();
    });

    it('Should handle undefined value in nested undefined variable', () => {
        const source = {
            node: undefined,
        };

        const variable = 'node.other';
        expect(resolveVariable(variable, source)).toBeUndefined();
    });

    it('Should resolve nested variable', () => {
        const source = {
            my_title: 'Title',
            my_description: 'Description',
            my_image: {
                url: 'Image URL',
            },
        };

        const variable = 'my_image.url';
        expect(resolveVariable(variable, source)).toEqual('Image URL');
    });

    it('Should resolve destructured arrays', () => {
        const source = {
            my_set: {
                my_other: [
                    {
                        my_prop: {
                            my_value: 1,
                        },
                    },
                    {
                        my_prop: {
                            my_value: 2,
                        },
                    },
                    {
                        my_prop: {
                            my_value: 3,
                        },
                    },
                ],
            },
        };

        const variable = 'my_set.my_other.my_prop.my_value';
        expect(resolveVariable(variable, source)).toEqual([1, 2, 3]);
    });
});
