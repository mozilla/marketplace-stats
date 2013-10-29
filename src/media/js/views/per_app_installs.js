define('views/per_app_installs', ['chartutils', 'l10n'],
       function(cutils, l10n) {

    var gettext = l10n.gettext;

    return function(builder, args) {
        var chartTitle = gettext('Installs');
        var slug = args[0];

        builder.start('apps_chart.html',
                      {title: chartTitle, regions: cutils.regions}).done(function() {
            cutils.createChart('per_app_installs', gettext('Installs'),
                               gettext('Number of Installs'), {}, slug);
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
