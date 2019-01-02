'use strict';

var path = require('path');
var fs = require('fs');
var uuid = require('uuid');

var config = {

    // Site title. Appears in page banner.

    site_title: 'Workshop',

    // The base URL of the site. Don't override this if hosting terminal
    // in conjunction with JupyterHub instance manager.

    base_url: process.env.URI_ROOT_PATH,

    // Contact email address, used in the "Get in touch" page footer link.

    // support_email: '',

    // Copyright designation for any content if necessart.

    // copyright: 'Copyright &copy; ' + new Date().getFullYear() + ' Author',

    // Amount of content to be shown from a page in search results.

    excerpt_length: 400,

    // The meta value by which to sort pages (value should be an integer).
    // If this option is blank pages will be sorted alphabetically.

    page_sort_meta: 'sort',

    // Should categories be sorted numerically (true) or alphabetically
    // (false). If true category folders need to contain a "sort" file
    // with an integer value

    category_sort: true,

    // Controls behavior of home page if meta ShowOnHome is not present.
    // If set to true all categories or files that do not specify
    // ShowOnHome meta property will be shown

    show_on_home_default: true,

    // Which Theme to Use? Do not override this unless you are providing
    // a complete copy of all the templates.

    theme_dir  : path.join(__dirname, 'themes'),
    theme_name : 'default',

    // Specify the path of your content folder where all your '.md'
    // files are located. Do not override this, it will be adjusted
    // down below to look in other vali places you can supply content.

    content_dir : path.join(__dirname, 'content'),

    // The public directory or document root for static files. Do not
    // override this, the routes are set up separately to look in other
    // directories corresponding to where you can provide content.

    public_dir  : path.join(__dirname, 'node_modules', 'raneto', 'themes',
        'default', 'public'),

    // The base URL for the images folder. Don't override this, extra
    // routes are setup so you can provide images in your content
    // directories rather than having to place them in a separate images
    // directory.

    image_url: process.env.URI_ROOT_PATH + '/images',

    // Add your analytics tracking code (including script tags).

    // analytics: '',

    // Controls whether content can be edited through the web interface.

    allow_editing : false,

    // Controls whether authentication is required. This enables HTTP
    // Basic authentication.

    authentication : false,

    // If editing is enabled, controls whether authentication is
    // required to be able to edit content through the web interface.

    authentication_for_edit: true,

    // If authentication is enabled, controls whether authentication
    // is also required simply to read content.

    authentication_for_read: false,

    // Controls whether Google OAuth authentication rather than HTTP
    // Basic authentication should be used. Don't override this.

    googleoauth: false,

    // Secret for use in generating cookies or other secrets.

    secret: uuid.v4(),

    // List of username, password pairs if authentication is enabled
    // and HTTP Basic authentication is used.

    credentials: [],

    // Locate for translations.

    locale: 'en',

    // Format for date/time values.

    datetime_format: 'Do MMM YYYY',

    // Controls whether the layout is suitable for rendering RTL languages.

    rtl_layout: false,

    // Controls page title and description in page meta information.

    home_meta: {
        title: 'Workshop',
        description: 'Workshop'
    },

    // Controls whether table of contents generation enabled for pages.

    table_of_contents: false,

    // List of variables available for interpolation in content. Where a
    // user supplied config.js exists, entries from it will be appended
    // to these.

    variables: [
      {
        name: 'username',
        content: ((process.env.JUPYTERHUB_USER === undefined)
            ? '' : process.env.JUPYTERHUB_USER)
      },
      {
        name: 'project_namespace',
        content: ((process.env.PROJECT_NAMESPACE === undefined)
            ? '' : process.env.PROJECT_NAMESPACE)
      },
      {
        name: 'cluster_subdomain',
        content: ((process.env.CLUSTER_SUBDOMAIN === undefined)
            ? '' : process.env.CLUSTER_SUBDOMAIN)
      }
    ],

    // URL where users should be redirected to restart the workshop.

    restart_url: process.env.RESTART_URL
};

var config_file;

// Check for alternate locations for content.

if (fs.existsSync('/opt/app-root/src/raneto/content')) {
    config.content_dir = '/opt/app-root/src/raneto/content';
    config_file = '/opt/app-root/src/raneto/config.js';
}
else if (fs.existsSync('/opt/app-root/raneto/content')) {
    config.content_dir = '/opt/app-root/raneto/content';
    config_file = '/opt/app-root/raneto/config.js';
}

// If a config.js is supplied with alternate content, merge it with the
// configuration above.

if (config_file && fs.existsSync(config_file)) {
    var config_overrides = require(config_file);
    for (var key1 in config_overrides) {
        var value1 = config_overrides[key1];
        if (value1.constructor == Array) {
            config[key1].concat(value);
        }
        else if (value1.constructor == Object) {
            for (var key2 in value1) {
                config[key1][key2] = value1[key2];
            }
        }
        else {
            config[key1] = value1;
        }
    }
}

module.exports = config;
