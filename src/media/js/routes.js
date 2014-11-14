(function() {

var root = '^/statistics/';

// Please leave quotes around keys! They're needed for Space Heater.
var routes = window.routes = [
    {'pattern': root + '?$', 'view_name': 'homepage'},
    {'pattern': '^/$', 'view_name': 'homepage'},

    {'pattern': root + 'apps-added-by-payment/$', 'view_name': 'apps_added'},
    {'pattern': root + 'apps-added-by-payment$', 'view_name': 'apps_added'},
    {'pattern': root + 'total-developers/$', 'view_name': 'total_developers'},
    {'pattern': root + 'total-developers$', 'view_name': 'total_developers'},
    {'pattern': root + 'total-visits/$', 'view_name': 'total_visits'},
    {'pattern': root + 'total-visits$', 'view_name': 'total_visits'},
    {'pattern': root + 'apps-installed/$', 'view_name': 'apps_installed'},
    {'pattern': root + 'apps-installed$', 'view_name': 'apps_installed'},
    {'pattern': root + 'apps-by-type/$', 'view_name': 'apps_by_type'},
    {'pattern': root + 'apps-by-type$', 'view_name': 'apps_by_type'},
    {'pattern': root + 'apps-available-by-type/$', 'view_name': 'apps_available_by_type'},
    {'pattern': root + 'apps-available-by-type$', 'view_name': 'apps_available_by_type'},
    {'pattern': root + 'apps-available-by-payment/$', 'view_name': 'apps_available_by_premium'},
    {'pattern': root + 'apps-available-by-payment$', 'view_name': 'apps_available_by_premium'},
    {'pattern': root + 'gross-revenue/$', 'view_name': 'gross_revenue'},
    {'pattern': root + 'gross-revenue$', 'view_name': 'gross_revenue'},
    {'pattern': root + 'ratings/$', 'view_name': 'ratings'},
    {'pattern': root + 'ratings$', 'view_name': 'ratings'},
    {'pattern': root + 'abuse-reports/$', 'view_name': 'abuse_reports'},
    {'pattern': root + 'abuse-reports$', 'view_name': 'abuse_reports'},

    // Per app stats:
    {'pattern': root + 'app/([^/<>"\']+)$', 'view_name': 'app_dashboard'},
    {'pattern': root + 'app/([^/<>"\']+)/$', 'view_name': 'app_dashboard'},
    {'pattern': root + 'app/([^/<>"\']+)/installs/$', 'view_name': 'per_app_installs'},
    {'pattern': root + 'app/([^/<>"\']+)/installs$', 'view_name': 'per_app_installs'},
    {'pattern': root + 'app/([^/<>"\']+)/visits/$', 'view_name': 'per_app_visits'},
    {'pattern': root + 'app/([^/<>"\']+)/visits$', 'view_name': 'per_app_visits'},
    {'pattern': root + 'app/([^/<>"\']+)/revenue/$', 'view_name': 'per_app_revenue'},
    {'pattern': root + 'app/([^/<>"\']+)/revenue$', 'view_name': 'per_app_revenue'},
    {'pattern': root + 'app/([^/<>"\']+)/ratings/$', 'view_name': 'per_app_ratings'},
    {'pattern': root + 'app/([^/<>"\']+)/ratings$', 'view_name': 'per_app_ratings'},
    {'pattern': root + 'app/([^/<>"\']+)/abuse-reports/$', 'view_name': 'per_app_abuse_reports'},
    {'pattern': root + 'app/([^/<>"\']+)/abuse-reports$', 'view_name': 'per_app_abuse_reports'},
    {'pattern': root + 'app/([^/<>"\']+)/average_rating/$', 'view_name': 'per_app_average_rating'},
    {'pattern': root + 'app/([^/<>"\']+)/average_rating$', 'view_name': 'per_app_average_rating'},

    {'pattern': '^/tests$', 'view_name': 'tests'},
    {'pattern': '^/fxa-authorize$', 'view_name': 'fxa_authorize'},
];

define('routes',
[
    'views/abuse_reports',
    'views/app_dashboard',
    'views/apps_added',
    'views/apps_available_by_premium',
    'views/apps_available_by_type',
    'views/apps_by_type',
    'views/apps_installed',
    'views/gross_revenue',
    'views/homepage',
    'views/per_app_abuse_reports',
    'views/per_app_average_rating',
    'views/per_app_installs',
    'views/per_app_ratings',
    'views/per_app_revenue',
    'views/per_app_visits',
    'views/ratings',
    'views/tests',
    'views/total_developers',
    'views/total_visits',
    'views/fxa_authorize'
], function() {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        var view = require('views/' + route.view_name);
        route.view = view;
    }
    return routes;
});
})();
