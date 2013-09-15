define('views/apps_added', ['l10n', 'linechart', 'urls', 'utils', 'z'],
       function(l10n, linechart, urls, utils, z) {

    var gettext = l10n.gettext;
    var $rangeElms = $('#range x-datepicker');
    var start = '';
    var end = '';
    var interval = 'day';

    start = utils.getRecentTimeDelta().start;
    end = utils.getRecentTimeDelta().end;

    function createChart(start, end) {
        linechart.createLineChart({
            tooltipValue: gettext('Apps'),
            yAxis: gettext('Number of Apps')
        },
        {
            url: urls.api.params(
                'apps_added',
                {
                    'start': start,
                    'end': end,
                    'interval': interval
                }
            )
        });
    }

    return function(builder) {
        var chartTitle = gettext('Apps Added by Payment Type');

        builder.start('apps_chart.html', {title: chartTitle}).done(function() {
            createChart(start, end);

            z.page.on('submit', '#rangeform', utils._pd(function() {
                $rangeElms = $('#range x-datepicker');
                start = $rangeElms[0].submitValue;
                end = $rangeElms[1].submitValue;

                createChart(start, end);
            }));
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
