/** Extends / Background Image*/
const backgroundImage = {
    'linear-blue':
        'linear-gradient(180deg, rgba(108, 99, 255, 0.2) 0%, rgba(217, 217, 217, 0) 73.27%)',
    'linear-orange':
        'linear-gradient(180deg, rgba(220, 139, 44, 0.2) 0%, rgba(217, 217, 217, 0) 73.27%)',
    'linear-red':
        'linear-gradient(180deg, rgba(200, 110, 90, 0.2) 0%, rgba(217, 217, 217, 0) 73.27%)',
};

/** Extends / Colors */
const colors = {
    blue: {
        100: '#D7E1FE',
        600: '#6C63FF',
        900: '#2F2E41',
    },
    orange: {
        100: '#FFE1BE',
        200: '#FFD29E',
        600: '#DC8B2C',
    },
    red: {
        100: '#FFDED7',
        200: '#FAA492',
        600: '#C86E5A',
    },
    grey: {
        200: '#F8F8F8',
        300: '#F2F2F3',
        350: '#838791',
        400: '#8A8A8A',
        500: '#50545E',
        600: '#45474A',
    },
};

/** Extends / Font Family */
const fontFamily = {
    inter: ['"Inter"', 'sans-serif'],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            backgroundImage,
            colors,
            fontFamily,
        },
    },
    plugins: [],
};
