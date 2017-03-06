# webpack-demo

Webpack 官方网站 [`Webpack`](https://webpack.github.io/docs/)、[`github`](https://github.com/webpack/webpack)地址。

## Webpack 安装
对于 windows 系统，先要进行全局安装。
```
npm install webpack -g
```
创建自己的项目文件夹 webpack-demo ，然后初始化。
```
npm init                    //在 webpack-demo 文件目录下生成 package.json 的配置文件
```
在文件目录下安装局域的 webpack
```
npm install webpack --save-dev  //生成 node_modules 文件夹
```

## 创建文件
创建源文件夹 src，放置项目需要的 css、img、js 文件；创建 dist 文件夹，放置打包后生成的文件。    
目录如下：    
![](1.png)

#### index.html 文件
在 webpack-demo 目录下创建 index.html 文件
```
<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>webpack-demo 仿Bootstrap中文网</title>
  </head>
  <body>
  </body>
  </html>
  ```

#### 配置文件
在 webpack-demo 目录下创建 webpack.config.js 文件。
创建项目入口文件 main.js 放在 src/script 文件目录下。配置 webpack.config.js 文件相关参数。

  ```
  module.exports = {
    entry: './src/script/main.js',    //入口文件
    output: {
        path: './dist',               //生成文件放置目录
        filename: 'js/[name].js'	  //生成的js文件名
    }
  }
  ```
为了使生成的 js 文件自动插入到 打包后的 html 文件中，借助插件 html-webpack-plugin 完成。
```
npm install html-webpack-plugin --save-dev
```
在配置文件中引入插件，并配置参数
```
var HtmlWebpackPlugin = require('html-webpack-plugin');

  plugins: [
        new HtmlWebpackPlugin({ 
            filename:'index.html',            //打包后生成的 html 文件名
            template: 'index.html',           //使根目录下引用的内容被打包后的html引用
            inject: 'body'                    //生成的 js 插入到 html 的 body 中
        })
  ]

```

#### css 文件
创建样式文件 style.css 放在 src/css 目录下。
使用 webpack 加载 css 样式。安装 css-loader、style-loader。
```
npm install css-loader style-loader --save-dev
```
配置webpack.config.js 文件相关参数：
```
  module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
  }
```

入口文件 main.js 中引入css。
```
require('../css/style.css');
```
运行 webpack，生成的 css 文件会以 `<style type="text/css">...</style>` 形式插入到 html 的头部。

若要 css 文件单独打包，安装插件 extract-text-webpack-plugin。
```
npm install extract-text-webpack-plugin --save-dev
```
配置webpack.config.js 文件，引入插件，并修改 loaders 中的相关参数：

```
  var ExtractTextPlugin = require("extract-text-webpack-plugin");

  module: {
        loaders: [
            test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
        ]
  }

 plugins: [
        new HtmlWebpackPlugin({ 
            filename:'index.html',            //打包后生成的 html 文件名
            template: 'index.html',           //使根目录下引用的内容被打包后的html引用
            inject: 'body'                    //生成的 js 插入到 html 的 body 中
        })，

        new ExtractTextPlugin('css/[name].css')  
 ]
```

运行 webpack 即可在 dist 目录下生成 css/main.css 文件，并以 link 标签形式插入到 html 头部。

#### 图片
使用 url-loader（但图片大小小于某一指定大小时，图片会被转换为 base64 编码）或 file-loader（处理图片/文件）。对图片压缩 image-webpack-loader 。
```
npm install url-loader --save-dev
npm install file-loader --save-dev
npm install image-webpack-loader --save-dev
```
webpack.config.js 文件配置。
```
{
    test: /\.(png|jpg|gif|svg)$/i,
    loaders: [
    'file-loader?name=img/[name]-[hash:5].[ext]',     //处理图片文件

    //'url-loader?limit=20000&name=img/[name]-[hash:5].[ext]',       
          //或使用url-loader，当图片大小小于某一个值转换为base64编码,大于该值交由 file-loader 处理

    'image-webpack-loader'      //使用文件压缩
    ]
}
```

对于 html 中的图片加载，还需要安装 html-loader。
```
npm install html-loader --save-dev
```
配置：
```
{
    test: /\.html$/,
    loader: 'html-loader'
}
```

最终目录结构如下：    
![](2.png)


