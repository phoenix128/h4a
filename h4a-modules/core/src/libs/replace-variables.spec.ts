import 'jest';
import replaceVariables from '@h4a/core/libs/replace-variables';

describe('Replace Variables', () => {
    it('Should replace variables', () => {
        const source = {
            my_title: '${title}',
            my_description: '${description}',
        };

        const variables = {
            title: 'My title',
            description: 'My description',
        };

        const res = replaceVariables(source, variables);

        expect(res).toEqual({
            my_title: 'My title',
            my_description: 'My description',
        });
    });

    it('Should replace nested values', () => {
        const source = {
            my_title: '${title}',
            my_description: '${description}',
            my_image: {
                url: '${url}',
            },
        };

        const variables = {
            title: 'My title',
            description: 'My description',
            url: 'https://example.com/image.jpg',
        };

        const res = replaceVariables(source, variables);

        expect(res).toEqual({
            my_title: 'My title',
            my_description: 'My description',
            my_image: {
                url: 'https://example.com/image.jpg',
            },
        });
    });

    it('Should replace nested variables', () => {
        const source = {
            my_title: '${title}',
            my_description: '${description}',
            my_image: {
                url: '${image.url}',
            },
        };

        const variables = {
            title: 'My title',
            description: 'My description',
            image: {
                url: 'https://example.com/image.jpg',
            },
        };

        const res = replaceVariables(source, variables);

        expect(res).toEqual({
            my_title: 'My title',
            my_description: 'My description',
            my_image: {
                url: 'https://example.com/image.jpg',
            },
        });
    });

    it('Should not replace values with no variables', () => {
        const source = {
            my_title: 'My title',
            my_description: 'My description',
            my_image: {
                url: 'https://example.com/image.jpg',
            },
        };

        const variables = {
            title: 'My title',
            description: 'My description',
            url: 'https://example.com/image.jpg',
        };

        const res = replaceVariables(source, variables);

        expect(res).toEqual({
            my_title: 'My title',
            my_description: 'My description',
            my_image: {
                url: 'https://example.com/image.jpg',
            },
        });
    });

    it('Should handle missing values in variables', () => {
        const source = {
            my_title: '${title}',
            my_description: '${description}',
            my_image: {
                url: '${url}',
            },
        };

        const variables = {
            title: 'My title',
        };

        const res = replaceVariables(source, variables);

        expect(res).toEqual({
            my_title: 'My title',
            my_description: '',
            my_image: {
                url: '',
            },
        });
    });

    it('Should handle multidimensional values', () => {
        const source = {
            my_title: '${title}',
            my_image: '${my_image}',
        };

        const variables = {
            title: 'My title',
            my_image: {
                url: 'https://example.com/image.jpg',
                alt: 'Lorem Ipsum',
            },
        };

        const res = replaceVariables(source, variables);

        expect(res).toEqual({
            my_title: 'My title',
            my_image: {
                url: 'https://example.com/image.jpg',
                alt: 'Lorem Ipsum',
            },
        });
    });

    it('Should handle array destructured', () => {
        const source = {
            my_values: '${my_set.my_other.my_prop.my_value}',
        };

        const variables = {
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

        const res = replaceVariables(source, variables);

        expect(res).toEqual({
            my_values: [1, 2, 3],
        });
    });
});
