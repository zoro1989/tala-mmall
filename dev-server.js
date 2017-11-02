/**
 * Created by Administrator on 2017/11/2.
 */
var config              = require("./webpack.config.js");
var WebpackDevServer    = require('webpack-dev-server');
var webpack             = require('webpack');
var express             = require('express')
var app                 = express();

config.entry.app.unshift('webpack-dev-server/client?http://localhost:8088/', 'webpack-hot-middleware/client');
var compiler = webpack(config);
app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

var server = new WebpackDevServer(compiler);
server.listen(8088);