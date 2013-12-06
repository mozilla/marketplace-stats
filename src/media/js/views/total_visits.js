define('views/total_visits', ['chartutils', 'l10n'], function(cutils, l10n) {

    var gettext = l10n.gettext;

    // Easy way to toggle regions for this view.
    var enableRegions = false;

    return function(builder) {
        // L10n: This is the title of a chart representing the total number of visits.
        var chartTitle = gettext('Visits');
        var context = {title: chartTitle};
        if (enableRegions) context.regions = cutils.regions;

        builder.start('apps_chart.html', context).done(function() {
            cutils.createChart(
                'total_visits',
                gettext('Visits'),
                gettext('Number of Visits'),
                {noregion: !enableRegions}
            );
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
