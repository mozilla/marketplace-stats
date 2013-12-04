define('views/per_app_revenue', ['chartutils', 'l10n', 'utils'],
       function(cutils, l10n, utils) {

    var gettext = l10n.gettext;

    // Easy way to toggle regions for this view.
    var enableRegions = false;

    return function(builder, args) {
        var chartTitle = gettext('Gross Revenue');
        var context = {title: chartTitle, slug: args[0]};
        if (enableRegions) context.regions = cutils.regions;

        builder.start('per_app_chart.html', context).done(function() {
            cutils.createChart(
                'per_app_revenue',
                gettext('Revenue'),
                gettext('Total Revenue'),
                {
                    noregion: !enableRegions,
                    valueFormat: 'currency'
                },
                context.slug
            );
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);

        builder.onload('app-data', function(app) {
            builder.z('title', chartTitle + ': ' + utils.translate(app.name));
        });
    };
});
