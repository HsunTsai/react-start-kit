const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
	return {
		entry: {
			'polyfill': 'babel-polyfill',
			'vendor': [
				'react',
				'react-dom',
				'redux',
				'react-redux',
				'react-router',
				'react-intl',
				'react-transition-group',
				'classnames'
			],
			'main': './src/index.js'
		},
		devtool: 'source-map',
		externals: 'Graph',
		resolve: {
			//免寫後綴名字
			extensions: ['.js', '.jsx', '.json'],
			//entry裡import的路徑會從src node_modules裡開始查找
			//使用path取得資料夾完整路徑，不然要自己手動copy __dirname並修改路徑
			modules: [path.join(__dirname, '/../src'), 'node_modules']
		},
		module: {
			rules: [{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					cache: false,
					failOnError: false,
					formatter: require('eslint-friendly-formatter'),
				}
			}, {
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					//被轉換的結果將會被暫存起來。當Webpack再次編譯時，將會首先嘗試從暫存中讀取
					cacheDirectory: true
				}
			}, {
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'images/[name].[ext]'
				}
			}, {
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 8192
				}
			}],
		},
		plugins: [
			//自動產生首頁
			new HtmlWebpackPlugin({
				title: 'React Web Title',
				favicon: 'src/favicon.ico',
				alwaysWriteToDisk: true,
				filename: 'index.html',
				//script引用順序，按依賴關係
				chunksSortMode: 'dependency',
				template: 'src/index.html',
				excludeChunks: 'manifest'
			})
		]
	};
}