const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.prod.js');

module.exports = merge(baseConfig, {
    output: {
        clean: true,
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            APP_BASENAME: '/vanroll',
        }),
    ],
});