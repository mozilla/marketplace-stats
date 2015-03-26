casper.test.begin('Test homepage loads correctly', {
    test: function(test) {
        helpers.startCasper();

        var developersSelector = '[data-src="total_developers"]';
        casper.waitForSelector(developersSelector, function() {
            test.assertSelectorHasText(developersSelector, 'Developers');
        });

        helpers.done(test);
    }
});
