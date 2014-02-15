define('views/abuse_reports', ['chartutils', 'l10n'],
       function(cutils, l10n) {

    var gettext = l10n.gettext;

    // Easy way to toggle regions for this view.
    var enableRegions = false;

    return function(builder) {
        // L10n: This is the title of a chart representing the number of apps added by payment type.
        var chartTitle = gettext('Abuse Reports');
        var context = {title: chartTitle};
        if (enableRegions) context.regions = cutils.regions;

        builder.start('apps_chart.html', context).done(function() {
            cutils.createChart(
                'abuse_reports',
                gettext('Abuse Reports'),
                gettext('Number of Abuse Reports'),
                {noregion: !enableRegions}
            );
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
