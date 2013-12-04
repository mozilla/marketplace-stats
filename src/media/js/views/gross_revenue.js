define('views/gross_revenue', ['chartutils', 'l10n'],
       function(cutils, l10n) {

    var gettext = l10n.gettext;

    // Easy way to toggle regions for this view.
    var enableRegions = false;

    return function(builder) {
        var chartTitle = gettext('Gross Revenue');
        var context = {title: chartTitle};
        if (enableRegions) context.regions = cutils.regions;

        builder.start('apps_chart.html', context).done(function() {
            cutils.createChart(
                'gross_revenue',
                gettext('Revenue'),
                gettext('Daily Total'),
                {
                    noregion: !enableRegions,
                    valueFormat: 'currency'
                }
            );
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
