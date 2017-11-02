/**
 * Created by Administrator on 2017/11/2.
 */
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var path                = require('path')

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
  return {
    template    : './src/views/' + name + '.html',
    filename    : 'views/' + name + '.html',
    title       : title,
    inject      : true,
    hash        : true,
    chunks      : ['common', name]
  };
};

var config = {
  entry: {
    'common': ['./src/pages/common/index.js'],
    'index': ['./src/pages/index/index.js'],
    app: ['./src/main.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    publicPath: '/dist'
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
      { test: /\.string$/, loader: 'html-loader'}
    ]
  },
  resolve : {
    alias : {
      node_modules    : __dirname + '/node_modules',
      util            : __dirname + '/src/utils',
      page            : __dirname + '/src/pages',
      service         : __dirname + '/src/service',
      image           : __dirname + '/src/image'
    }
  },
  plugins: [
    // 独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name : 'common',
      filename : 'js/base.js'
    }),
    // 把css单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),
    // html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    // 热更新插件
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;