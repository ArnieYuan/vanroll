const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = require('./webpack.common.js');

const plugins = [
	new webpack.EnvironmentPlugin({
		NODE_ENV: 'production',
	}),
	new webpack.LoaderOptionsPlugin({
		minimize: true,
	}),
];
module.exports = merge(baseConfig, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[chunkhash:16].js',
		chunkFilename: 'js/[id].[chunkhash:16].js',
		publicPath: './',
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					compress: {
						unused: true, // tree shaking
					},
					ecma: 6,
					mangle: true,
				},
			}),
		],
	},
	plugins,
});
