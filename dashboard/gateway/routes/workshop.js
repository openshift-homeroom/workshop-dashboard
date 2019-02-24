var express = require('express');
var proxy = require('http-proxy-middleware');

workshops_urls = process.env.WORKSHOPS_URLS;

module.exports = function(app, prefix) {
    var router = express.Router();

    if (workshops_urls) {
        // Workshopper.
        router.use(proxy(prefix, {
            target: 'http://127.0.0.1:10082',
            ws: true
        }));
    }
    else {
        // Raneto.
        router.use(proxy(prefix, {
            target: 'http://127.0.0.1:10082',
            pathRewrite: {
                ['^' + prefix]: ''
            },
        }));
    }

    return router;
}
