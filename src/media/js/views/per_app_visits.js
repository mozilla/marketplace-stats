define('views/per_app_visits',
    ['chartutils', 'core/l10n', 'core/utils'],
    function(cutils, l10n, utils) {

    var gettext = l10n.gettext;

    // Easy way to toggle regions for this view.
    var enableRegions = false;

    return function(builder, args) {
        var chartTitle = gettext('Visits');
        var context = {title: chartTitle, slug: args[0]};
        context.enableRegions = enableRegions;

        builder.start('per_app_chart.html', context).done(function() {
            cutils.createChart(
                'per_app_visits',
                gettext('Visits'),
                gettext('Number of Visits'),
                {
                    dropNulls: false, // Treat nulls as zeros.
                    noregion: !enableRegions
                },
                context.slug
            );
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);

        builder.onload('app-data', function(app) {
            builder.z('title', chartTitle + ': ' + utils.translate(app.name));
        });
    };
});
