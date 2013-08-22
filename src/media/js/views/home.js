define('views/home', ['l10n', 'linechart'], function(l10n, linechart) {

    var gettext = l10n.gettext;

    return function(builder) {
        builder.start('home.html').done(function() {
        	linechart.createLineChart({tooltipValue: 'Total', yAxis: 'Count (users)'},
        							  {container: '#chart', width: 690, height: 400});

        });

        builder.z('type', 'root');
        builder.z('title', gettext('Home'));  // L10n: Page not found (404)
    };
});
