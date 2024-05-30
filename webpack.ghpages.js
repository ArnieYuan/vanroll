const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.prod.js');

module.exports = merge(baseConfig, {
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            REACT_APP_BASENAME: '/vanroll',
        }),
    ],
});