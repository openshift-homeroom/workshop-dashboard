var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.locals.console_url = process.env.CONSOLE_URL;
app.locals.restart_url = process.env.RESTART_URL;

app.locals.with_slides = false;

if (fs.existsSync('/opt/app-root/src/workshop/slides/index.html')) {
    app.locals.with_slides = true;
}
else if (fs.existsSync('/opt/app-root/workshop/slides/index.html')) {
    app.locals.with_slides = true;
}

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

app.use(function (req, res) {
    res.render('dashboard');
});

module.exports = app
