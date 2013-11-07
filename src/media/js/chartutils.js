define('chartutils', ['linechart', 'notification', 'settings', 'urls', 'user', 'utils', 'z'],
       function(linechart, notification, settings, urls, user, utils, z) {

    // Get last `dayrange` days when no chart date range specified.
    var dayrange = 30;
    var interval = 'day';
    var start = getRecentTimeDelta().start;
    var end = getRecentTimeDelta().end;
    var region = user.get_setting('region') || 'us';
    var params = utils.getVars();
    var doRedirect = false;
    var ask = notification.confirmation;
    var notify = notification.notification;
    var regs = settings.REGION_CHOICES_SLUG;

    var regions = Object.keys(regs).map(function(reg) {
        return {code: reg, name: regs[reg]};
    });

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
        if ('region' in params) region = params.region;
    } else {
        doRedirect = true;
    }

    // We need the first piece only. "2013-09-10T23:14:06.641Z" to "2013-09-10"
    function getISODate(date) {
        return date.toISOString().split('T')[0];
    }

    // Sets the date range in the 'to' and 'from' inputs.
    function updateRange($rng, start, end) {
        $rng.eq(0).val(start);
        $rng.eq(1).val(end);
    }

    // Uses string concatenation to preserve pretty param order.
    function getNewURL(apiName, start, end, region, slug) {
        var segment = '?start=' + start + '&end=' + end;
        if (region) segment += '&region=' + region;

        if (slug) {
            return urls.reverse(apiName, [slug]) + segment;
        }
        return urls.reverse(apiName) + segment;
    }

    // lblValue...remember Visual Basic?
    // Optional args: opts, slug
    function createChart(apiName, lblValue, lblYAxis, opts, slug) {
        if (opts && opts.noregion) {
            region = null;
        } else {
            if (!region) {
                region = user.get_setting('region') || 'us';
            }
        }
        var newURL = getNewURL(apiName, start, end, region, slug);
        var options = {};
        var $range = $('#range x-datepicker');

        if (region) {
            var $icon = $('.regions em');
            $icon.removeClass().addClass(region);
            $('.regions select').on('change', function() {
                region = this.value;
                $icon.removeClass().addClass(region);
                newURL = getNewURL(apiName, start, end, region, slug);
                z.page.trigger('divert', [newURL]);
            }).find('option[value=' + region + ']').prop('selected', true);
        }

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
                end = $range.eq(0).val();
                start = $range.eq(1).val();
                updateRange($range, start, end);
                z.page.trigger('divert', [getNewURL(apiName, start, end, region, slug)]);
            });
        } else if (start == end) {
            notify({message: gettext('Please enter a valid date range')});
        }

        window.history.replaceState({}, '', newURL);

        var params = {
            'start': start,
            'end': end,
            'interval': interval,
            'region': region
        };

        if (opts && opts.noregion) {
            delete params.region;
            // We don't need to send this flag further.
            delete opts.noregion;
        }

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

        // あくま
        updateRange($range, start, end);

        z.page.on('submit.range', '#rangeform', utils._pd(function() {
            start = $range.eq(0).val();
            end = $range.eq(1).val();

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
