/**
 * Created by Administrator on 2017/11/2.
 */
var config              = require("./webpack.config.js");
var WebpackDevServer    = require('webpack-dev-server');
var webpack             = require('webpack');

config.entry.common.unshift('webpack-dev-server/client?http://localhost:8088/');
var compiler = webpack(config);

var server = new WebpackDevServer(compiler);
server.listen(8088);