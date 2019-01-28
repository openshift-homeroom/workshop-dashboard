var express = require('express');
var proxy = require('http-proxy-middleware');

module.exports = function(app, prefix) {
    var router = express.Router();

    router.use(proxy(prefix, {
        target: 'http://127.0.0.1:10082',
        pathRewrite: {
            ['^' + prefix]: ''
        },
    }));

    return router;
}
