'use strict';

var path = require('path');
var fs = require('fs');

var base_url = process.env.URI_ROOT_PATH || '';

var config = {
    // Log format for messages and request logging.

    log_format: process.env.LOG_FORMAT || 'dev',

    // Port that the application server listens on.

    server_port: parseInt(process.env.PORT || '8080'),

    // Prefix when hosting site at a sub URL.

    base_url: base_url,

    // Specifies the path of content folder where all content
    // files are located. This will be overridden down below to
    // look in other valid places that content can be kept.

    content_dir: path.join(__dirname, 'content'),

    // URL where the users should be redirected to restart the
    // workshop when they reach the final page.

    restart_url: process.env.RESTART_URL,

    // Site title. Appears in page banner.

    site_title: 'Homeroom',

    // Analytics code to be inserted in content pages for tracking.

    analytics: '',

    // Where no list of pages is defined, and the default page
    // exists it will be added to the list of pages. If the page
    // is Markdown, it will be processed and meta data used to
    // try and determine all pages in the navigation path.

    default_page: 'index',

    // List of content pages. Can define 'path' to page, without
    // extension. The page can either be Markdown (.md) or
    // AsciiDoc (.adoc). Name of page should be give by 'title'.
    // Any title in Markdown meta data will be ignored. Any
    // document title in an AsciiDoc page will be ignored. If
    // not title is given it will be generated from name of
    // file. Label on the button to go to next page can be
    // overridden by 'exit_sign'. For the final page, can define
    // 'exit_link', if need to send users off site, otherwise
    // should never be defined.

    pages: [
        /*
        {
            'path': 'index',
            'title': 'Workshop Overview',
            'exit_sign': 'Setup Workshop',
        },
        {
            'path': 'setup',
            'title': 'Workshop Setup',
            'exit_sign': 'Start Workshop',
        },
        {
            'path': 'exercies/step-1',
            'title': 'User Steps 1',
        },
        {
            'path': 'exercies/step-2',
            'title': 'User Steps 2',
            'exit_sign': 'Finish Workshop',
        },
        {
            'path': 'finish',
            'title': 'Workshop Finished',
            'exit_sign': 'Start Workshop',
        },
        */
    ],

    // Template engine to optionally be applied to content pages.
    // By default will use simple '%variable%' interpolation. Can
    // override and set this to 'liquid.js' to use that template
    // engine. Then need to use '{{ variable }}' for variables.

    template_engine: '',

    // List of variables available for interpolation in content.
    // Where a user supplied config.js provides variables,
    // entries from it will be appended to these.

    variables: [
      {
        name: 'console_url',
        content: path.join(base_url, '..', 'console')
      },
      {
        name: 'slides_url',
        content: path.join(base_url,'..', 'slides')
      },
      {
        name: 'terminal_url',
        content: path.join(base_url, '..', 'terminal')
      },
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
};

var workshop_dir = process.env.WORKSHOP_DIR || '/opt/app-root/src/workshop';

var config_file = process.env.CONFIG_FILE;
var content_dir = process.env.CONTENT_DIR;

// Check for alternate locations for content.

if (content_dir && fs.existsSync(content_dir)) {
    config.content_dir = content_dir;
}
else {
    content_dir = undefined;
}

if (!content_dir) {
    if (fs.existsSync(workshop_dir + '/content')) {
        config.content_dir = workshop_dir + '/content';
    }
    else if (fs.existsSync('/opt/app-root/workshop/content')) {
        config.content_dir = '/opt/app-root/workshop/content';
    }
}

if (config_file && !fs.existsSync(config_file)) {
    config_file = undefined;
}

if (!config_file) {
    if (fs.existsSync('/opt/app-root/src/.workshop/config.js')) {
        config_file = '/opt/app-root/src/.workshop/config.js';
    }
    else if (fs.existsSync(workshop_dir + '/config.js')) {
        config_file = workshop_dir + '/config.js';
    }
    else if (fs.existsSync('/opt/app-root/workshop/config.js')) {
        config_file = '/opt/app-root/workshop/config.js';
    }
}

// If user config.js is supplied with alternate content, merge
// it with the configuration above. Allow users to override
// anything for the time being. May need to restrict it later.

if (config_file && fs.existsSync(config_file)) {
    var config_overrides = require(config_file);
    for (var key1 in config_overrides) {
        var value1 = config_overrides[key1];
        if (value1.constructor == Array) {
            config[key1] = config[key1].concat(value1);
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

exports.default = config;

module.exports = exports.default;
