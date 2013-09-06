define('views/apps_added', ['l10n', 'linechart', 'urls', 'utils'],
	   function(l10n, linechart, urls, utils) {

    var gettext = l10n.gettext;

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
        		url: utils.urlparams(
                		urls.api.url('apps_added'),
                		{'start': '2013-07-01',
                		 'end': '2013-08-01',
                 		 'region': 'None'}
            		)
        	});
        });

        builder.z('type', 'root');
        builder.z('title', gettext('Apps Added by Payment Type'));
    };
});
