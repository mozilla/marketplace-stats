define('chartutils', ['linechart', 'urls', 'utils', 'z'],
       function(linechart, urls, utils, z) {

    // Get last `dayrange` days when no chart date range specified.
    var dayrange = 30;
    var interval = 'day';
    var start = getRecentTimeDelta().start;
    var end = getRecentTimeDelta().end;

    // We need the first piece only. "2013-09-10T23:14:06.641Z" to "2013-09-10"
    function getISODate(date) {
        return date.toISOString().split('T')[0];
    }

    // Sets the date range in the 'to' and 'from' inputs.
    function updateRange(start, end) {
        $range = $('#range x-datepicker');
        $range[0].value = start;
        $range[1].value = end;
    }

    // lblValue...remember Visual Basic?
    function createChart(apiName, lblValue, lblYAxis) {
        updateRange(start, end);

        $range = $('#range x-datepicker');
        start = $range[0].submitValue;
        end = $range[1].submitValue;

        linechart.createLineChart({tooltipValue: lblValue, yAxis: lblYAxis}, {
            url: urls.api.params(
                apiName,
                {
                    'start': start,
                    'end': end,
                    'interval': interval
                }
            )
        });

        // Causes event flood. Check if this is bound first.
        z.page.on('submit', '#rangeform', utils._pd(function() {
            $rangeElms = $('#range x-datepicker');
            start = $rangeElms[0].submitValue;
            end = $rangeElms[1].submitValue;

            createChart();
        }));
    }

    function getRecentTimeDelta() {
        var today = new Date();
        var end = getISODate(today);
        var start = new Date();

        start.setDate(today.getDate() - dayrange);
        start = getISODate(start);

        return {start: start, end: end};
    }

    return {
        'createChart': createChart
    };

});
