define('views/total_developers', ['chartutils', 'l10n'], function(cutils, l10n) {

    var gettext = l10n.gettext;

    return function(builder) {
        var chartTitle = gettext('Total Developers');

        builder.start('apps_chart.html',
                      {title: chartTitle}).done(function() {
            cutils.createChart('total_developers', gettext('Developers'),
                               gettext('Number of Developers'), {noregion: true});
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
