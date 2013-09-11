define('views/apps_added', ['l10n', 'linechart', 'urls', 'utils'],
       function(l10n, linechart, urls, utils) {

    var gettext = l10n.gettext;
    var $rangeElms = $('#range x-datepicker');
    var start = '';
    var end = '';
    var dayrange = 30; // Last 30 days if no range found.
    var interval = 'day';

    // We need first piece only. "2013-09-10T23:14:06.641Z" to "2013-09-10"
    function getISODate(date) {
        return date.toISOString().split('T')[0];
    }

    if ($rangeElms.length) {
        start = $rangeElms[0].submitValue;
        end = $rangeElms[1].submitValue;
    } else { // No range found.
        var today = new Date();
        end = getISODate(today);

        start = new Date();
        start.setDate(today.getDate() - dayrange);
        start = getISODate(start);
    }

    console.log('Using start:', start, ' and end:', end);

    return function(builder) {
        builder.start('apps_added.html').done(function() {
            linechart.createLineChart({
                tooltipValue: 'Total',
                yAxis: 'Count (users)'
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
        });

        builder.z('type', 'root');
        builder.z('title', gettext('Apps Added by Payment Type'));
    };
});
