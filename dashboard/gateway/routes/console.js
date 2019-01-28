var express = require('express');
var proxy = require('http-proxy-middleware');
var logger = require('../logger');

var console_url = process.env.CONSOLE_URL;

module.exports = function(app, prefix) {
    var router = express.Router();

    if (console_url) {
        router.use(proxy(prefix, {
            target: console_url,
            ws: true,
            onProxyRes: function (proxyRes, req, res) {
                delete proxyRes.headers['x-frame-options'];
            }
        }));
    }

    return router;
}
