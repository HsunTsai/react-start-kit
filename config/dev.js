const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
//const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
//這裡使用require是因為這在nodejs裡的編譯環境，要使用CommonJS方式引用
//被webpack編譯的檔案才會支援import

const contextRoot = '/',
	domain = 'http://(!!!Your localhost)'; //Proxy後端的host(自己起在Local端)
//domain = 'http://(!!!Your serverhost)/(!!!Your server back-end path)'; //Proxy後端的host(在Server端的Backend 與上者選一)

module.exports = function (env) {
	const config = webpackMerge(commonConfig(), {
		entry: [
			'babel-polyfill',
			'react-hot-loader/patch',
			'./src/index.js'
		],
		output: {
			publicPath: contextRoot
		},
		devServer: {
			port: 9999,
			historyApiFallback: true,
			contentBase: path.join(__dirname, '/../src'),
			proxy: {
				'/(!!!Your API Path)': {
					target: '(!!!Your API server hostname)', //ex: http://www.hsunserver.ga/
					changeOrigin: true,
					secure: false,
					cookieDomainRewrite: ''
				},
			}
		},
		module: {
			rules: [{
				test: /\.(scss|css)$/,
				use: ExtractTextPlugin.extract({
					publicPath: '../',
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true
						},
					},]
				})
			}],
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'CONTEXT_ROOT': JSON.stringify(contextRoot),
					'DOMAIN': JSON.stringify(domain)
				}
			}),
			//把模組中css部份提取出來成一個檔案
			new ExtractTextPlugin({
				disable: true
			}),
			//產生chunk id(by chunk name)HMR下才能判斷CSS更新
			new webpack.NamedModulesPlugin(),
		]
	});
	return config;
}