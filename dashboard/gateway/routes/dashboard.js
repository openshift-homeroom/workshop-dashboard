var express = require('express');
var path = require('path');

var app = express();

app.locals.console_url = process.env.CONSOLE_URL;
app.locals.restart_url = process.env.RESTART_URL;

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

app.use(function (req, res) {
    res.render('dashboard');
});

module.exports = app
