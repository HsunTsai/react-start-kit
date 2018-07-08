const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
//const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
//這裡使用require是因為這在nodejs裡的編譯環境，要使用CommonJS方式引用
//被webpack編譯的檔案才會支援import
module.exports = function (env) {
    const config = webpackMerge(commonConfig(), {
        entry: [
            'babel-polyfill',
            'react-hot-loader/patch',
            './src/index.js'
        ],
        output: {
            publicPath: '/'
        },
        devServer: {
            port: 9999,
            historyApiFallback: true,
            contentBase: path.join(__dirname, '/../src')
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