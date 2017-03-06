var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/script/main.js',
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                loaders: [
                    'file-loader?name=img/[name]-[hash:5].[ext]',     //处理图片文件
                    //'url-loader?limit=20000&name=img/[name]-[hash:5].[ext]',       //使用url-loader，当图片大小小于某一个值转换为base64编码
                    'image-webpack-loader'      //使用文件压缩
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename:'index.html',
            template: 'index.html',           //使根目录下引用的内容被打包后的html引用
            inject: 'body'
        }),
        new ExtractTextPlugin('css/[name].css')
    ]
};