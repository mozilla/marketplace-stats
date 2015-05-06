define('views/per_app_ratings',
    ['chartutils', 'core/l10n', 'core/utils'],
    function(cutils, l10n, utils) {

    var gettext = l10n.gettext;

    // Easy way to toggle regions for this view.
    var enableRegions = false;

    return function(builder, args) {
        // L10n: This is the title of a chart representing the number of ratings.
        var chartTitle = gettext('New Ratings');
        var context = {title: chartTitle, slug: args[0]};
        context.enableRegions = enableRegions;

        builder.start('per_app_chart.html', context).done(function() {
            cutils.createChart(
                'per_app_ratings',
                gettext('Ratings'),
                gettext('Number of Ratings'),
                {noregion: !enableRegions},
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
