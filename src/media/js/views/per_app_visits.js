define('views/per_app_visits', ['chartutils', 'l10n'],
       function(cutils, l10n) {

    var gettext = l10n.gettext;

    return function(builder, args) {
        // TODO: Provide the app name.
        var chartTitle = gettext('Visits');
        var slug = args[0];

        builder.start('apps_chart.html',
                      {title: chartTitle, regions: cutils.regions}).done(function() {
            cutils.createChart('per_app_visits', gettext('Visits'),
                               gettext('Number of Visits'), {}, slug);
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
