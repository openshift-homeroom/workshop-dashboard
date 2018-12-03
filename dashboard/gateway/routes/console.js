var express = require('express');
var proxy = require('http-proxy-middleware');

var uri_root_path = process.env.URI_ROOT_PATH || '';

var uri_pattern = '^' + uri_root_path + '/console';

var console_url = process.env.CONSOLE_URL;

var app = express();

if (console_url) {
    app.use(proxy({
        target: console_url,
        onProxyRes: function (proxyRes, req, res) {
            delete proxyRes.headers['x-frame-options'];
        }
    }));
}

module.exports = app
