var express = require('express');
var proxy = require('http-proxy-middleware');

var uri_root_path = process.env.URI_ROOT_PATH || '';

var uri_pattern = '^' + uri_root_path + '/console';

var app = express();

app.use(proxy({
    target: 'http://127.0.0.1:8083',
    onProxyRes: function (proxyRes, req, res) {
        delete proxyRes.headers['x-frame-options'];
    }
}));

module.exports = app
