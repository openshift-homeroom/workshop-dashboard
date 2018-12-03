var express = require('express');

var app = express();

app.locals.console_url = process.env.CONSOLE_URL;

app.set('views', '/opt/workshop/gateway/views');
app.set('view engine', 'pug');

app.use(function (req, res) {
    res.render('dashboard');
});

module.exports = app
