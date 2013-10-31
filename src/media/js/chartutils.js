define('chartutils', ['linechart', 'notification', 'urls', 'utils', 'z'],
       function(linechart, notification, urls, utils, z) {

    // Get last `dayrange` days when no chart date range specified.
    var dayrange = 30;
    var interval = 'day';
    var start = getRecentTimeDelta().start;
    var end = getRecentTimeDelta().end;
    var region = 'us';
    var params = utils.getVars();
    var doRedirect = false;
    var ask = notification.confirmation;
    var notify = notification.notification;

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

    var strings = {
        errors: {
            500: gettext('Server error detected. Please try again later.'),
            404: gettext('The statistics endpoint requested is invalid.'),
            403: gettext('Authentication failure detected. Please sign in and try again.'),
            400: gettext('The statistics data request is incomplete or invalid.'),
            unknown: gettext('An unknown server error was detected. Please try again later.')
        }
    };

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

    function getNewURL(apiName, start, end, region, slug) {
        // Ugly but preserves logical param order.
        if (slug) {
            return urls.reverse(apiName, [slug]) +
                    '?start=' + start + '&end=' + end + '&region=' + region;
        }
        return urls.reverse(apiName) +
                    '?start=' + start + '&end=' + end + '&region=' + region;
    }

    // lblValue...remember Visual Basic?
    // Optional args: opts, slug
    function createChart(apiName, lblValue, lblYAxis, opts, slug) {
        var newURL = getNewURL(apiName, start, end, region, slug);
        var options = {};
        var $range = $('#range x-datepicker');

        $('.regions a').each(function() {
            var $this = $(this);
            if ($this.hasClass(region)) $this.addClass('active');
            $this.on('click', function() {
                region = this.className.replace(' active', '');
                newURL = getNewURL(apiName, start, end, region, slug);
                z.page.trigger('divert', [newURL]);
            });
        });

        if (doRedirect) {
            doRedirect = false; // Redirect loops are delirious joy.
            z.page.trigger('divert', [newURL]);
            window.history.replaceState({}, '', newURL);
            return;
        }

        z.page.off('submit.range');

        if (isNegativeRange(start, end)) {
            ask({
                message: gettext('You have entered a negative date range. Reverse?'),
                closable: true
            }).then(function() {
                end = $range[0].value;
                start = $range[1].value;
                updateRange(start, end);
                z.page.trigger('divert', [getNewURL(apiName, start, end, region, slug)]);
            });
        } else if (start == end) {
            notify({message: gettext('Please enter a valid date range')});
        }

        window.history.replaceState({}, '', newURL);

        var params = {'start': start, 'end': end, 'interval': interval, 'region': region};

        // Slug provided. Per app stats URLs are constructed differently.
        // options.url is the API endpoint. newURL is the current path.
        if (slug) {
            options = {url: urls.api.charturl(apiName, [slug], params)};
        } else {
            options = {url: urls.api.chartparams(apiName, params)};
        }

        // Override options from opts argument if any.
        for (var prop in opts) {
            options[prop] = opts[prop];
        }

        // Conjures thine chart from the ether to stimulate thine humours.
        linechart.createLineChart({
            tooltipValue: lblValue,
            yAxis: lblYAxis,
            strings: strings
        }, options);

        updateRange(start, end);

        z.page.on('submit.range', '#rangeform', utils._pd(function() {
            $rangeElms = $('#range x-datepicker');
            start = $rangeElms[0].value;
            end = $rangeElms[1].value;

            createChart(apiName, lblValue, lblYAxis, opts, slug);
        }));
    }

    function isNegativeRange(start, end) {
        var aStart = start.split('-');
        var aEnd = end.split('-');

        // Can't call .apply() on `Date`. This would be a cruel interview question.
        start = new Date(aStart[0], aStart[1], aStart[2]);
        end = new Date(aEnd[0], aEnd[1], aEnd[2]);

        return (start - end) > 0;
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
