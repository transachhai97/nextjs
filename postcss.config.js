const purgecss = {
    '@fullhuman/postcss-purgecss': {
        content: ['./src/pages/**/*.js'],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    },
};

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production'
            ? purgecss
            : {}),
    },
};