
const baseConfig = require('./base.js');
const webpackMerge = require('webpack-merge');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const package = require('../package.json');

const contextRoot = '/',
	domain = 'http://(!!!Your localhost)'; //Proxy後端的host(自己起在Local端)
//domain = 'http://(!!!Your serverhost)/(!!!Your server back-end path)'; //Proxy後端的host(在Server端的Backend 與上者選一)

module.exports = function (env = 'development') {
	const config = webpackMerge(baseConfig(env), {
		entry: {
			polyfill: 'babel-polyfill',
			hotLoader: 'react-hot-loader/patch',
			main: './src/index.jsx',
		},
		output: {
			publicPath: contextRoot,
		},
		devServer: {
			port: 9999,
			historyApiFallback: true,
			contentBase: path.join(__dirname, '/../src'),
			https: false,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			proxy: {
				'/(!!!Your API Path)': {
					target: '(!!!Your API server hostname)', //ex: http://www.hsunserver.ga/
					changeOrigin: true,
					secure: false,
					cookieDomainRewrite: '',
				},
			},
			hot: true,
		},
		devtool: 'cheap-module-eval-source-map',
		module: {
			rules: [
				{
					test: /\.(scss|css)$/,
					use: [
						{
							loader: 'style-loader',
							options: {
								sourceMap: true,
							},
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				},
				// {
				// 	test: /\.(png|jpe?g|gif)(\?.*)?$/,
				// 	loader: 'url-loader',
				// },
			],
		},
		resolve: {
			alias: {
				'react-dom': '@hot-loader/react-dom',
			},
		},
		plugins: [
			new CaseSensitivePathsPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(env),
					CONTEXT_ROOT: JSON.stringify(contextRoot),
					DOMAIN: JSON.stringify(domain),
					VERSION: JSON.stringify(package.version + package.build),
				},
			}),
			// new BundleAnalyzerPlugin(),
		],
	});
	return config;
};
