define('utils_local',
    ['core/urls'],
    function(urls) {

    // We need the first piece only. "2013-09-10T23:14:06.641Z" to "2013-09-10"
    function getISODate(date) {
        return date.toISOString().split('T')[0];
    }

    // Uses string concatenation to preserve pretty param order.
    function getNewURL(apiName, start, end, interval, region, slug) {
        var segment = '?start=' + start + '&end=' + end;
        if (interval) {
            segment += '&interval=' + interval;
        }
        if (region) {
            segment += '&region=' + region;
        }
        if (slug) {
            return urls.reverse(apiName, [slug]) + segment;
        }
        return urls.reverse(apiName) + segment;
    }

    // Credit to ngoke and potch.
    function hex2rgba(hex, o) {
        hex = parseInt(hex.substring(hex[0] == '#' ? 1 : 0), 16);
        return 'rgba(' +
            (hex >> 16) + ',' +
            ((hex & 0x00FF00) >> 8) + ',' +
            (hex & 0x0000FF) + ',' + o + ')';
    }

    // Gets the date range of the last `daterange` days.
    function getRecentTimeDelta(dayrange) {
        var today = new Date();
        var yesterday = new Date(today.setDate(today.getDate() - 1));
        var end = getISODate(yesterday);
        var start = new Date();

        // Prevents `setDate(0)` from setting to the last day of the previous month.
        if (yesterday.getDate() === dayrange) {
            start.setMonth(yesterday.getMonth()); // 1st of the month.
        } else {
            start.setDate(yesterday.getDate() - dayrange);
        }

        start = getISODate(start);
        return {start: start, end: end};
    }

    return {
        'getISODate': getISODate,
        'getNewURL': getNewURL,
        'getRecentTimeDelta': getRecentTimeDelta,
        'hex2rgba': hex2rgba
    };
});
