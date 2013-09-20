define('views/apps_added', ['brick', 'chartutils', 'l10n'],
       function(brick, cutils, l10n) {

    var gettext = l10n.gettext;

    return function(builder) {
        var chartTitle = gettext('Apps Added by Payment Type');

        builder.start('apps_chart.html', {title: chartTitle}).done(function() {
            cutils.createChart('apps_added', gettext('Apps'),
                               gettext('Number of Apps'));
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
