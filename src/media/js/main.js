console.log('Firefox Marketplace Statistics');

define('main', ['init'], function(init) {
init.done(function() {
require(
    [// Modules actually used in main.
     'core/capabilities', 'core/l10n', 'core/log', 'core/navigation',
     'core/nunjucks', 'core/user', 'core/z', 'regions', 'user_helpers',
     // Modules we require to initialize global stuff.
     'brick', 'd3', 'core/login', 'core/forms'],
    function(caps, l10n, log, navigation,
             nunjucks, user, z, regions, userHelpers) {
    var logger = log('main');

    nunjucks.env.dev = true;
    var nunjucks_globals = nunjucks.require('globals');
    nunjucks_globals.user_helpers = userHelpers;

    z.body.addClass('html-' + l10n.getDirection());

    z.page.one('loaded', function() {
        logger.log('Hiding splash screen');
        $('#splash-overlay').addClass('hide');
    });

    // This lets you refresh within the app by holding down command + R.
    if (caps.chromeless) {
        window.addEventListener('keydown', function(e) {
            if (e.keyCode == 82 && e.metaKey) {
                window.location.reload();
            }
        });
    }

    z.page.on('reload_chrome', function() {
        // Last minute template compilation.
        logger.log('Reloading chrome');
        var context = {z: z, REGIONS: regions.REGION_CHOICES_SLUG};
        $('#site-header').html(
            nunjucks.env.render('header.html', context));
        $('#site-footer').html(
            nunjucks.env.render('footer.html', context));

        z.body.toggleClass('logged-in', user.logged_in());
        z.page.trigger('reloaded_chrome');
    }).trigger('reload_chrome');

    z.body.on('click', '.site-header .back', function(e) {
        e.preventDefault();
        navigation.back();
    });

    // Perform initial navigation.
    logger.log('Triggering initial navigation');
    if (!z.spaceheater) {
        z.page.trigger('navigate',
                       [window.location.pathname + window.location.search]);
    } else {
        z.page.trigger('loaded');
    }

    z.page.on('logged_in', function() {
        z.page.trigger('navigate',
                       [window.location.pathname + window.location.search]);
    });
});
});
});
