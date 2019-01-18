var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.locals.terminal_tab = process.env.TERMINAL_TAB;

app.locals.console_url = process.env.CONSOLE_URL;
app.locals.restart_url = process.env.RESTART_URL;

var workshop_dir = process.env.WORKSHOP_DIR || '/opt/app-root/src/workshop';

var slides_dir = process.env.SLIDES_DIR;

app.locals.with_slides = false;

if (slides_dir) {
    if (fs.existsSync(slides_dir + '/index.html')) {
        app.locals.with_slides = true;
    }
    else {
        slides_dir = undefined;
    }
}

if (!slides_dir) {
    if (fs.existsSync(workshop_dir + '/slides/index.html')) {
        app.locals.with_slides = true;
    }
    else if (fs.existsSync('/opt/app-root/workshop/slides/index.html')) {
        app.locals.with_slides = true;
    }
}

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

app.use(function (req, res) {
    res.render('dashboard');
});

module.exports = app
