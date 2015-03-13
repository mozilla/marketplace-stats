define('views/apps_available_by_type',
    ['chartutils', 'core/l10n'],
    function(cutils, l10n) {

    var gettext = l10n.gettext;

    // Easy way to toggle regions for this view.
    var enableRegions = true;

    return function(builder) {
        // L10n: This is the title of a chart representing the number of apps split by app type.
        var chartTitle = gettext('Apps by App Type');
        var context = {title: chartTitle};
        if (enableRegions) context.regions = cutils.regions;

        builder.start('apps_chart.html', context).done(function() {
            cutils.createChart(
                'apps_available_by_type',
                gettext('Apps'),
                gettext('Number of Apps'),
                {noregion: !enableRegions}
            );
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
