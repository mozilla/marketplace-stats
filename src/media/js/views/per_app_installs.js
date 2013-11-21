define('views/per_app_installs', ['chartutils', 'l10n', 'utils'],
       function(cutils, l10n, utils) {

    var gettext = l10n.gettext;

    return function(builder, args) {
        var chartTitle = gettext('Installs');
        var slug = args[0];

        builder.start('per_app_chart.html',
                      {title: chartTitle, slug: slug}).done(function() {
            cutils.createChart(
                'per_app_installs',
                gettext('Installs'),
                gettext('Number of Installs'),
                {noregion: true},
                slug
            );
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);

        builder.onload('app-data', function(app) {
            builder.z('title', chartTitle + ': ' + utils.translate(app.name));
        });
    };
});
