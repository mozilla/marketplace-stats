define('views/per_app_visits', ['chartutils', 'l10n', 'utils'],
       function(cutils, l10n, utils) {

    var gettext = l10n.gettext;

    return function(builder, args) {
        var chartTitle = gettext('Visits');
        var slug = args[0];

        builder.start('per_app_chart.html',
                      {title: chartTitle, slug: slug}).done(function() {
            cutils.createChart('per_app_visits', gettext('Visits'),
                               gettext('Number of Visits'), {noregion: true}, slug);
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);

        builder.onload('app-data', function(app) {
            builder.z('title', chartTitle + ': ' + utils.translate(app.name));
        });
    };
});