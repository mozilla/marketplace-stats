define('views/gross_revenue', ['chartutils', 'l10n'],
       function(cutils, l10n) {

    var gettext = l10n.gettext;

    return function(builder) {
        var chartTitle = gettext('Gross Revenue');

        builder.start('apps_chart.html',
                      {title: chartTitle}).done(function() {
            cutils.createChart('gross_revenue', gettext('Revenue'),
                               gettext('Daily Total'), {noregion: true});
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
