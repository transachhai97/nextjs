const path = require('path');
const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const genericNames = require('generic-names');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const localIdentName = isProduction ? '[name]__[local]--[hash:base64:5]' : '[path][name]__[local]';

const generate = genericNames(localIdentName, {
    context: process.cwd(),
});

const getLocalIdent = (loaderContext, localIdentName, localName) =>
    generate(localName, loaderContext.resourcePath);

const nextConfig = {
    // Target must be serverless
    target: 'serverless',
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it

        const aliases = config.resolve.alias || {};
        config.resolve.alias = {
            ...aliases,
            'private-next-pages': path.resolve(__dirname, 'src/pages'),
            '@': path.resolve(__dirname, 'src'),
        };

        config.plugins.push(
            new StyleLintPlugin({
                files: ['src/**/*.{js,jsx,htm,html,css,sss,less,scss,sass}'],
            }),
        );
        // Important: return the modified config
        return config;
    },
};

module.exports = withPlugins(
    [
        [
            sass,
            {
                cssModules: true,
                cssLoaderOptions: {
                    importLoaders: 1,
                    getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                        const pathLocalName = loaderContext.resourcePath;
                        if (
                            pathLocalName.includes('src/styles/index.scss')
                            || pathLocalName.includes('src\\styles\\index.scss')
                            || pathLocalName.includes('node_modules')
                        ) {
                            return localName;
                        } else {
                            return getLocalIdent(loaderContext, localIdentName, localName);
                        }
                    },
                },
            },
        ],
    ],
    nextConfig,
);
