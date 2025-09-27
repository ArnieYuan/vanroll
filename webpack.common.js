const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
	new HtmlWebpackPlugin({
		template: "src/index.html",
	}),
]

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|ts)$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'src'),
				options: {
					cacheDirectory: true,
					babelrc: false,
					presets: [
						[
							'@babel/preset-env',
							{
								modules: false,
								useBuiltIns: 'usage',
								corejs: 3,
								targets: { browsers: ['last 5 versions', 'ie >= 11'], node: 'current' },
							},
						],
						[
							'@babel/preset-typescript',
							{
								allExtensions: true,
								allowDeclareFields: true,
							},
						],
					],
					plugins: [
						'@babel/plugin-transform-runtime',
						['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
						['@babel/plugin-proposal-class-properties', { loose: true }],
						['@babel/plugin-proposal-private-methods', { loose: true }],
						['@babel/plugin-proposal-decorators', { legacy: true }],
						['@babel/plugin-proposal-private-property-in-object', { loose: true }],
						'@babel/plugin-syntax-dynamic-import',
						'@babel/plugin-syntax-async-generators',
						'dynamic-import-webpack',
						['import', { libraryName: 'antd', style: true }],
					],
				},
				exclude: /node_modules/,
			},
			{
				test: /\.(css|less)$/,
				use: ['style-loader', 'css-loader', {
					loader: "less-loader",
					options: {
						lessOptions: {
							javascriptEnabled: true
						}
					}
				}],
			},
			{
				test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader',
				options: {
					publicPath: './',
					name: 'fonts/[hash].[ext]',
					limit: 10000,
				},
			},
		],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					enforce: true,
				},
			},
		},
		noEmitOnErrors: true,
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	node: {
		net: 'empty',
		fs: 'empty',
		tls: 'empty',
	},
	plugins,
};
