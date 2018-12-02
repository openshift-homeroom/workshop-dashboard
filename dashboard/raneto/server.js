#!/usr/bin/env node

'use strict';

// Modules
var debug = require('debug')('raneto');

var express = require('express');

var path = require('path');

// Here is where we load Raneto.
// When you are in your own project repository,
// Raneto should be installed via NPM and loaded as:
var raneto = require('raneto');
//
// For development purposes, we load it this way in this example:
//var raneto = require('../app/index.js');

// Then, we load our configuration file
// This can be done inline, with a JSON file,
// or with a Node.js module as we do below.
// var config = require('./config.default.js');
var config = require('./config.js');

var server = express();

server.get('/images/*', express.static(path.join(__dirname, 'public')));
server.get('/styles/*', express.static(path.join(__dirname, 'public')));
server.get('/scripts/*', express.static(path.join(__dirname, 'public')));

server.get(/\.(jpe?g|png|gif|svg)$/i, express.static(config.content_dir));

// Finally, we initialize Raneto
// with our configuration object
var app = raneto(config);

server.use(app);

// Load the HTTP Server
var server = server.listen(app.get('port'), function () {
  debug('Express HTTP server listening on port ' + server.address().port);
});
