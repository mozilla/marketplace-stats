define('views/total_visits', ['chartutils', 'l10n'], function(cutils, l10n) {

    var gettext = l10n.gettext;

    return function(builder) {
        var chartTitle = gettext('Total Visits');

        builder.start('apps_chart.html',
        			  {title: chartTitle}).done(function() {
            cutils.createChart('total_visits', gettext('Visits'), gettext('Number of Visits'), {noregion: true});
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
