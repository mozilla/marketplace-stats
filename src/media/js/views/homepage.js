define('views/homepage', ['l10n', 'linechart', 'requests', 'urls'],
       function(l10n, linechart, requests, urls) {

    var gettext = l10n.gettext;
    var api = urls.api.url;

    return function(builder) {
        builder.start('homepage.html').done(function() {
            requests.get(api('global_totals')).done(function(data) {
                if ($.isNumeric(data.installs.total)) {
                    var $installs = $('.total-val.installs');
                    $installs.text(
                        $installs.text() + ' ' + d3.format(',d')(data.installs.total)
                    ).show();
                }
            });

            linechart.createSparkLines();
        });

        builder.z('type', 'root');
        builder.z('title', '');
    };
});
