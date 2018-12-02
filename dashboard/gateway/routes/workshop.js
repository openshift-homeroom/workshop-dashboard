var express = require('express');
var proxy = require('http-proxy-middleware');

var uri_root_path = process.env.URI_ROOT_PATH || '';

var uri_pattern = '^' + uri_root_path + '/workshop';

var app = express();

app.use(proxy({
    target: 'http://127.0.0.1:8082',
    pathRewrite: {
        [uri_pattern]: ''
    },
}));

module.exports = app
