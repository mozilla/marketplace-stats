console.log('Firefox Marketplace Statistics');

define('main', ['routes', 'settings_app'], function() {
require(['core/init'], function() {
require([
    'underscore',
    'brick',
    'd3',
    'core/helpers',  // Must come before mostly everything else.
    'core/capabilities',
    'core/forms',
    'core/l10n',
    'core/log',
    'core/login',
    'core/navigation',
    'templates',
    'user_helpers',
    'core/user',
    'core/z'
], function() {
    var log = require('core/log');
    var console = log('main');
    console.log('Dependencies resolved, starting init');

    var capabilities = require('core/capabilities');
    var nunjucks = require('templates');
    var regions = require('regions');
    var z = require('core/z');

    nunjucks.env.dev = true;

    var nunjucks_globals = require('core/nunjucks').require('globals');
    nunjucks_globals.user_helpers = require('user_helpers');

    z.body.addClass('html-' + require('core/l10n').getDirection());

    z.page.one('loaded', function() {
        console.log('Hiding splash screen');
        $('#splash-overlay').addClass('hide');
    });

    // This lets you refresh within the app by holding down command + R.
    if (capabilities.chromeless) {
        window.addEventListener('keydown', function(e) {
            if (e.keyCode == 82 && e.metaKey) {
                window.location.reload();
            }
        });
    }

    // Do some last minute template compilation.
    z.page.on('reload_chrome', function() {
        console.log('Reloading chrome');
        var context = {z: z, REGIONS: regions.REGION_CHOICES_SLUG};
        $('#site-header').html(
            nunjucks.env.render('header.html', context));
        $('#site-footer').html(
            nunjucks.env.render('footer.html', context));

        z.body.toggleClass('logged-in', require('core/user').logged_in());
        z.page.trigger('reloaded_chrome');
    }).trigger('reload_chrome');

    z.body.on('click', '.site-header .back', function(e) {
        e.preventDefault();
        require('core/navigation').back();
    });

    // Perform initial navigation.
    console.log('Triggering initial navigation');
    if (!z.spaceheater) {
        z.page.trigger('navigate', [window.location.pathname + window.location.search]);
    } else {
        z.page.trigger('loaded');
    }

    z.page.on('logged_in', function() {
        z.page.trigger('navigate', [window.location.pathname + window.location.search]);
    });
});
});
});
