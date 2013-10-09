define('chartutils', ['brick', 'linechart', 'urls', 'utils', 'z'],
       function(brick, linechart, urls, utils, z) {

    // Get last `dayrange` days when no chart date range specified.
    var dayrange = 30;
    var interval = 'day';
    var start = getRecentTimeDelta().start;
    var end = getRecentTimeDelta().end;
    var region = 'us';
    var params = utils.getVars();
    var doRedirect = false;

    // Update as needed.
    var regions = [
        {code: 'us', name: gettext('United States')},
        {code: 'uk', name: gettext('United Kingdom')},
        {code: 'br', name: gettext('Brazil')},
        {code: 'es', name: gettext('Spain')},
        {code: 'co', name: gettext('Colombia')},
        {code: 've', name: gettext('Venezuela')},
        {code: 'pl', name: gettext('Poland')},
        {code: 'mx', name: gettext('Mexico')},
        {code: 'hu', name: gettext('Hungary')},
        {code: 'de', name: gettext('Germany')},
        {code: 'me', name: gettext('Montenegro')},
        {code: 'rs', name: gettext('Serbia')},
        {code: 'gr', name: gettext('Greece')}
    ];

    // Use range url params if found.
    if ('start' in params && 'end' in params) {
        start = params.start;
        end = params.end;
        region = params.region;
    } else {
        doRedirect = true;
    }

    // We need the first piece only. "2013-09-10T23:14:06.641Z" to "2013-09-10"
    function getISODate(date) {
        return date.toISOString().split('T')[0];
    }

    // Sets the date range in the 'to' and 'from' inputs.
    function updateRange(start, end) {
        var $range = $('#range x-datepicker');
        $range[0].value = start;
        $range[1].value = end;
    }

    // lblValue...remember Visual Basic?
    function createChart(apiName, lblValue, lblYAxis) {
        // Ugly but preserves logical param order.
        var newURL = urls.reverse(apiName) +
                    '?start=' + start + '&end=' + end + '&region=' + region;

        $('.regions a').each(function() {
            var $this = $(this);
            if ($this.hasClass(region)) $this.addClass('active');
            $this.on('click', function() {
                region = this.className.replace(' active', '');
                newURL = urls.reverse(apiName) +
                         '?start=' + start + '&end=' + end + '&region=' + region;
                z.page.trigger('divert', [newURL]);
            });
        });

        if (doRedirect) {
            alert('yo');
            doRedirect = false; // Redirect loops are delirious joy.
            z.page.trigger('divert', [newURL]);
            window.history.replaceState({}, '', newURL);

            return;
        }

        updateRange(start, end);
        z.page.off('submit.range');

        var $range = $('#range x-datepicker');
        start = $range[0].value;
        end = $range[1].value;

        window.history.replaceState({}, '', newURL);

        linechart.createLineChart({tooltipValue: lblValue, yAxis: lblYAxis}, {
            url: urls.api.params(apiName,
                {'start': start, 'end': end, 'interval': interval, 'region': region})
        });

        z.page.on('submit.range', '#rangeform', utils._pd(function() {
            $rangeElms = $('#range x-datepicker');
            start = $rangeElms[0].value;
            end = $rangeElms[1].value;

            createChart(apiName, lblValue, lblYAxis);
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
        'createChart': createChart,
        'regions': regions
    };

});
