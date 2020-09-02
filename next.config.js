const path = require('path');
const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');

const nextConfig = {
    // Target must be serverless
    target: 'serverless',
    webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
        // Note: we provide webpack above so you should not `require` it

        const aliases = config.resolve.alias || {};
        config.resolve.alias = {
            ...aliases,
            'private-next-pages': path.resolve(__dirname, 'src/pages'),
            '@': path.resolve(__dirname, 'src'),
        };

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
                    localIdentName: '[local]___[hash:base64:5]',
                },
            },
        ],
    ],
    nextConfig
);
