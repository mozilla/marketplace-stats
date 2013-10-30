define('views/app_dashboard', ['l10n', 'utils'], function(l10n, utils) {

    var gettext = l10n.gettext;

    return function(builder, args) {
        builder.start('app_dashboard.html', {slug: args[0]});

        builder.z('type', 'root');
        builder.z('title', gettext('Loading...'));

        builder.onload('app-data', function(app) {
            builder.z('title', utils.translate(app.name));
        });
    };
});
