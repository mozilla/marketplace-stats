define('views/apps_installed', ['chartutils', 'l10n'], function(cutils, l10n) {

    var gettext = l10n.gettext;

    return function(builder) {
        var chartTitle = gettext('Apps Installed');

        builder.start('apps_chart.html',
                      {title: chartTitle}).done(function() {
            cutils.createChart(
                'apps_installed',
                gettext('Apps'),
                gettext('Number of Apps'),
                {noregion: true}
            );
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
