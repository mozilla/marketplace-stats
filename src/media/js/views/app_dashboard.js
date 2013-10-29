define('views/app_dashboard', ['l10n'], function(l10n) {

    var gettext = l10n.gettext;

    return function(builder, args) {
        builder.start('app_dashboard.html', {slug: args[0]});

        builder.z('type', 'root');
        builder.z('title', '');
    };
});
