define('views/per_app_abuse_reports',
    ['chartutils', 'core/l10n', 'core/utils'],
    function(cutils, l10n, utils) {

    var gettext = l10n.gettext;

    // Easy way to toggle regions for this view.
    var enableRegions = false;

    return function(builder, args) {
        var chartTitle = gettext('Abuse Reports');
        var context = {title: chartTitle, slug: args[0]};
        if (enableRegions) context.regions = cutils.regions;

        builder.start('per_app_chart.html', context).done(function() {
            cutils.createChart(
                'per_app_abuse_reports',
                gettext('Abuse Reports'),
                gettext('Number of Abuse Reports'),
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
