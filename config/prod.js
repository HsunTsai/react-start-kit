const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//這裡使用require是因為這在nodejs裡的編譯環境，要使用CommonJS方式引用
//被webpack編譯的檔案才會支援import
module.exports = function(env) {
    const config = webpackMerge(commonConfig(), {
        output: {
            path: path.join(__dirname, '/../dist'),
            //cache chunk hash
            filename: 'js/[name].[chunkhash].bundle.js',
            //async chunk
            chunkFilename: 'js/[name]-[id].[chunkhash].bundle.js',
            publicPath:'/yourPublicPath/'
        },
        devtool: '',
        module: {
            rules: [{
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            minimize: true
                        },
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        },
                    }, ]
                })
            }],
        },
        plugins: [
            new CleanWebpackPlugin(['dist/*'], {
                root: path.join(__dirname, '/../')
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                beautify: false,
                mangle: {
                    //是否支持IE6/7/8,UglifyJS預設不相容IE
                    screw_ie8: true,
                    //保留function name
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                },
                comments: false
            }),
            //產生共用獨立的檔案
            //manifest(chunk map)避免vendor無更動chunkhash卻變更而導致沒有cache
            new webpack.optimize.CommonsChunkPlugin({
                name: ['polyfill', 'vendor', 'manifest'], //,,
                minChunks: Infinity
            }),
            //把模組中css部份提取出來成一個檔案
            //內層css與外層main.js共用chunk hash所以改用contenthash
            new ExtractTextPlugin({
                filename: 'css/styles.[contenthash].css',
                //額外的chunk都壓縮成一個文件
                allChunks: true
            }),
            new CopyWebpackPlugin([
                {
                    from: 'src/data',
                    to:'data'
                },{
                    from: 'src/WEB-INF',
                    to:'WEB-INF'
                }
            ], {
                ignore: [
                    '*.txt',
                ],
                copyUnmodified: true
            }),
        ]
    });
    return config;
}