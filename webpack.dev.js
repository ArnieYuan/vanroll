const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.common.js');

const devPort = 4000;
const host = 'localhost';

module.exports = merge(baseConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, 'public'),
		publicPath: '/',
		filename: '[name].[hash:16].js',
		chunkFilename: '[id].[hash:16].js',
	},
	devServer: {
		port: devPort,
		static: {
			directory: path.resolve(__dirname, 'public'),
		},
		hot: true,
		historyApiFallback: true,
		host,
		devMiddleware: {
			publicPath: '/',
		},
		proxy: [
			{
				context: ['/api'],
				target: 'http://localhost',
			},
			{
				context: ['/api/ws'],
				target: 'ws://localhost',
				ws: true,
			},
		],
		headers: { 'X-Frame-Options': 'sameorigin' },
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
});
