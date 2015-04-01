function dateString(date) {
    return date.toJSON().split('T')[0];
}

function dateDaysAgo(ndays) {
    var date = new Date();
    date.setDate(date.getDate() - ndays);
    return date;
}

casper.test.begin('Test that the datepicker sets the date', {
    test: function(test) {
        helpers.startCasper({
            path: '/statistics/total-developers/',
            viewport: 'desktop',
        });

        var datepickerSelector = 'x-datepicker[name="to"]';
        var inputSelector = datepickerSelector + ' input[type="text"]';
        var yesterday = dateDaysAgo(1);

        casper.waitForSelector('.main.chart', function() {
            test.assertExists(datepickerSelector);
            test.assertExists(inputSelector);
            test.assertEqual(
                casper.getElementAttribute(datepickerSelector, 'value'),
                dateString(yesterday));
        });

        casper.then(function() {
            helpers.triggerEvent(inputSelector, 'focus');
        });

        casper.waitForSelector(
            datepickerSelector + '[focused="true"]',
            function() {
                var twoDaysAgo = dateDaysAgo(2);
                casper.click(
                    datepickerSelector +
                    ' .day[data-date="' + dateString(twoDaysAgo) + '"]');
                test.assertEqual(
                    casper.getElementAttribute(datepickerSelector, 'value'),
                    dateString(twoDaysAgo));
            });

        helpers.done(test);
    },
});
