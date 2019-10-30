

const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./base.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const package = require("../package.json");

const contextRoot = '/(!!!Your front-end path on server)/',
	domain = '/(!!!Your back-end path on server)';

module.exports = function (env = 'production') {
	const config = webpackMerge(baseConfig(env), {
		output: {
			path: path.join(__dirname, '/../dist'),
			//cache chunk hash
			filename: 'js/[name].[chunkhash].bundle.js',
			//async chunk
			chunkFilename: 'js/[name]-[id].[chunkhash].bundle.js',
			publicPath: contextRoot
		},
		module: {
			rules: [{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				]
			},
			// {
			// 	test: /\.(png|jpe?g|gif)(\?.*)?$/,
			// 	loader: 'url-loader',
			// 	options: {
			// 		limit: 8192,
			// 		name: 'images/[name].[ext]'
			// 	}
			// }
			],
		},
		plugins: [
			new CleanWebpackPlugin(['dist/*'], {
				root: path.join(__dirname, '/../')
			}),
			new MiniCssExtractPlugin({
				filename: 'src/[name].[hash].css',
				chunkFilename: 'src/[id].[hash].css',
			}),

			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(env),
					'CONTEXT_ROOT': JSON.stringify(contextRoot),
					'DOMAIN': JSON.stringify(domain),
					'VERSION': JSON.stringify(package.version + package.build)
				}
			}),
			new CopyWebpackPlugin([
				{
					from: 'src/images',
					to: 'images'
				}, {
					from: 'src/data',
					to: 'data'
				}, {
					from: 'src/WEB-INF',
					to: 'WEB-INF'
				}], {
					ignore: [
						'*.txt',
					],
					copyUnmodified: true
				}),
		]
	});
	return config;
}