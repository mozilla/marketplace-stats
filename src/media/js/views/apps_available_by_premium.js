define('views/apps_available_by_premium', ['chartutils', 'l10n'],
       function(cutils, l10n) {

    var gettext = l10n.gettext;

    return function(builder) {
        var chartTitle = gettext('Apps Available by Payment Type');

        builder.start('apps_chart.html', {title: chartTitle}).done(function() {
            cutils.createChart('apps_available_by_premium', gettext('Apps'),
                               gettext('Number of Apps'));
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
