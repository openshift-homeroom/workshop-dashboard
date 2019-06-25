var express = require('express');
var path = require('path');
var fs = require('fs');

var config = require('./config.js');
var content = require('./content.js');
var logger = require('./logger.js');

// Calculate the list of pages with navigation path and a page
// index to make it easier to look up attributes of a page.

var pages = content.pages();
var page_index = content.page_index(pages);

logger.info('Pages', { pages: pages });

// Setup all the sub routes.

router = express.Router();

// Redirect to the first page in navigation path if root.

router.get('/', function (req, res) {
    if (pages.length == 0) {
        res.redirect(path.join(req.originalUrl, config.default_page));
    }
    else {
        res.redirect(path.join(req.originalUrl, pages[0].path));
    }
});

// If request matches a static file, serve up the contents
// immediately. We look in content directory as well as the
// directory for static assets. Looking in the content
// directory means that images for content can be colocated.

router.use(express.static(config.content_dir));
router.use(express.static(path.join(__dirname, 'static')));

// Also look for static files from packages installed by npm.

router.use('/fontawesome', express.static(path.join(__dirname,
  'node_modules/@fortawesome/fontawesome-free')));
router.use('/bootstrap', express.static(path.join(__dirname,
  'node_modules/bootstrap/dist')));
router.use('/jquery', express.static(path.join(__dirname,
  'node_modules/jquery/dist')));
router.use('/popper', express.static(path.join(__dirname,
  'node_modules/popper.js/dist')));
router.use('/requirejs/require.js', express.static(path.join(__dirname,
  'node_modules/requirejs/require.js')));

// Handle requests, allowing mapping to Markdown/AsciiDoc.

router.get('/:pathname(*)', async function (req, res, next) {
    // Only allow a .html extension if an extension is
    // supplied with the request path. This is for
    // compatability with previous rendering system.

    var pathname = req.params.pathname;

    var extension = pathname.match(/\.[0-9a-z]+$/);

    if (extension) {
        if (extension != '.html') {
            return next();
        }
        else {
            pathname = pathname.slice(0, -5);
        }
    }

    // Render content and generate page from template.

    var page = page_index[pathname];
    var title = page && page.title;

    var variables = config.variables.slice(0);

    variables.push({ name: 'base_url', content: config.base_url });

    var body = await content.render(pathname, variables);

    if (body) {
        var options = {
            config: config,
            title: title,
            content: body,
            page: page,
            pages: pages,
        };

        return res.render('page', options);
    }

    // Fall through to next handler if no match. This
    // should result in a 404 Not Found being returned.

    next();
});

exports.default = router;

module.exports = exports.default;
