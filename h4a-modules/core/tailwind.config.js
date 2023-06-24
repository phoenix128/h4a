/** @type {import('@tailwindcss/colors')} */
const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        '../../h4a-modules/*/src/components/**/*.{js,ts,jsx,tsx}',
        '../../h4a-overwrites/*/src/components/**/*.{js,ts,jsx,tsx}',
        '../../apps/**/app/*.{js,ts,jsx,tsx}',
        '!../**/node_modules',
    ],
    safelist: [
        {
            pattern: /grid-cols-(\d+)/,
            variants: ['lg', 'bg', 'sm', 'md', 'xl', '2xl'],
        },
    ],
    theme: {
        extend: {
            fontFamily: {
                base: ['var(--font-base)', ...fontFamily.sans],
            },
            colors: {
                text: colors.gray['700'],
                primary: colors.amber['300'],
                secondary: colors.orange['300'],
                background: colors.zinc['50'],
                card: colors.white,
                'card-hover': colors.zinc['100'],
                highlight: colors.gray['400'],
            },
        },
    },
    plugins: [],
};
