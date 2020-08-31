const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const package = require('../package.json');

const contextRoot = '/(!!!Your front-end path on server)/',
	domain = 'http://(!!!Your serverhost)/(!!!Your server back-end path)';
// backend & frontend in the same server
// domain = '/(!!!Your server back-end path)'

module.exports = (env = 'production') => {
	const config = merge(baseConfig(env), {
		output: {
			path: path.join(__dirname, '/../dist'),
			filename: 'js/[name].[chunkhash].bundle.js',
			chunkFilename: 'js/[name]-[id].[chunkhash].bundle.js',
			publicPath: contextRoot,
		},
		// devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.(scss|css)$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'postcss-loader',
						{ loader: 'sass-loader', options: { implementation: require('sass') } },
					],
				},
			],
		},
		optimization: {
			minimize: true,
		},
		plugins: [
			new CleanWebpackPlugin(['dist/*'], {
				root: path.join(__dirname, '/../'),
			}),
			new MiniCssExtractPlugin({
				filename: 'src/[name].[hash].css',
				chunkFilename: 'src/[id].[hash].css',
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(env),
					CONTEXT_ROOT: JSON.stringify(contextRoot),
					DOMAIN: JSON.stringify(domain),
					VERSION: JSON.stringify(package.version + package.build),
				},
			}),

			new CopyWebpackPlugin({
				patterns: [
					{ from: 'src/images', to: 'images' },
					{ from: 'src/data', to: 'data' },
					{ from: 'src/WEB-INF', to: 'WEB-INF' },
					{ from: 'web.config', to: 'web.config' },
				],
			}),
		],
	});
	return config;
};
