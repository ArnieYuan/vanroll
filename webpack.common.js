const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'src/index.html'),
		filename: "index.html",
	}),
]

module.exports = {
	entry: {
		main: './src/index.ts',
	},
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
		fallback: {
			net: false,
			fs: false,
			tls: false,
		},
	},
	plugins,
};
