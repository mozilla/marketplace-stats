define('views/apps_added', ['l10n', 'linechart', 'urls', 'utils', 'z'],
       function(l10n, linechart, urls, utils, z) {

    var gettext = l10n.gettext;
    var $rangeElms = $('#range x-datepicker');
    var start = '';
    var end = '';
    var dayrange = 30; // Last 30 days if no range found.
    var interval = 'day';

    // We need the first piece only. "2013-09-10T23:14:06.641Z" to "2013-09-10"
    function getISODate(date) {
        return date.toISOString().split('T')[0];
    }

    // TODO: This should be checking URL params not the range inputs!
    if (false) {
        start = $rangeElms[0].submitValue;
        end = $rangeElms[1].submitValue;
    } else { // No range found.
        var today = new Date();
        end = getISODate(today);

        start = new Date();
        start.setDate(today.getDate() - dayrange);
        start = getISODate(start);
    }

    function createChart(start, end) {
        $('#chart').empty();
        linechart.createLineChart({
            tooltipValue: gettext('Total'),
            yAxis: gettext('Apps Added')
        },
        {
            container: '#chart',
            width: 690,
            height: 400,
            url: urls.api.params(
                'apps_added',
                {
                    'start': start,
                    'end': end,
                    'interval': interval
                }
            )
        });
        console.log('Creating chart using start:', start, ' and end:', end);
    }

    return function(builder) {
        builder.start('apps_added.html').done(function() {
            createChart(start, end);

            z.page.on('submit', '#rangeform', utils._pd(function() {
                $rangeElms = $('#range x-datepicker');
                start = $rangeElms[0].submitValue;
                end = $rangeElms[1].submitValue;

                createChart(start, end);
            }));
        });

        builder.z('type', 'root');
        builder.z('title', gettext('Apps Added by Payment Type'));
    };
});
