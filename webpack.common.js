const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'src/index.html'),
		chunks: ['main'],
		filename: "index.html",
	}),
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'src/creator.html'),
		filename: 'creator.html',
		// Only include the 'creator' and 'vendor' chunks
		chunks: ['creator', 'vendor'],
	}),
	new CopyWebpackPlugin({
		patterns: [
			{ from: 'src/tailwind.config.js', to: 'tailwind.config.js' }
		]
	})
]

module.exports = {
	entry: {
		main: './src/index.ts',
		creator: './src/creator.ts',
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
					],
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
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
