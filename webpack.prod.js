const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const baseConfig = require('./webpack.common.js');

const plugins = [
	new webpack.EnvironmentPlugin({
		NODE_ENV: 'production',
	}),
	new webpack.LoaderOptionsPlugin({
		minimize: true,
	}),
	new WorkboxPlugin.GenerateSW({
		skipWaiting: true,
		clientsClaim: true,
		swDest: 'sw.js',
	}),
];
module.exports = merge(baseConfig, {
	mode: 'production',
	entry: {
		vendor: ['lodash'],
		app: ['core-js/stable', path.resolve(__dirname, 'src/index.ts')],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[chunkhash:16].js',
		chunkFilename: 'js/[id].[chunkhash:16].js',
		publicPath: './',
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: false,
				terserOptions: {
					warnings: false,
					compress: {
						warnings: false,
						unused: true, // tree shaking
					},
					ecma: 6,
					mangle: true,
					unused: true,
				},
			}),
		],
	},
	plugins,
});
