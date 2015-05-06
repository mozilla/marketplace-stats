define('views/apps_added',
    ['chartutils', 'core/l10n'],
    function(cutils, l10n) {

    var gettext = l10n.gettext;

    // Easy way to toggle regions for this view.
    var enableRegions = true;

    return function(builder) {
        // L10n: This is the title of a chart representing the number of apps added by payment type.
        var chartTitle = gettext('New Apps by Payment Type');
        var context = {title: chartTitle};
        context.enableRegions = enableRegions;

        builder.start('apps_chart.html', context).done(function() {
            cutils.createChart(
                'apps_added',
                gettext('Apps'),
                gettext('Number of Apps'),
                {noregion: !enableRegions}
            );
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
