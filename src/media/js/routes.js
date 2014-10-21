(function() {

// Please leave quotes around keys! They're needed for Space Heater.
var routes = window.routes = [
    {'pattern': '^/statistics/?$', 'view_name': 'homepage'},
    {'pattern': '^/$', 'view_name': 'homepage'},

    {'pattern': '^/statistics/apps\-added\-by\-payment/$', 'view_name': 'apps_added'},
    {'pattern': '^/statistics/apps\-added\-by\-payment$', 'view_name': 'apps_added'},
    {'pattern': '^/statistics/total\-developers/$', 'view_name': 'total_developers'},
    {'pattern': '^/statistics/total\-developers$', 'view_name': 'total_developers'},
    {'pattern': '^/statistics/total\-visits/$', 'view_name': 'total_visits'},
    {'pattern': '^/statistics/total\-visits$', 'view_name': 'total_visits'},
    {'pattern': '^/statistics/apps\-installed/$', 'view_name': 'apps_installed'},
    {'pattern': '^/statistics/apps\-installed$', 'view_name': 'apps_installed'},
    {'pattern': '^/statistics/apps\-by\-type/$', 'view_name': 'apps_by_type'},
    {'pattern': '^/statistics/apps\-by\-type$', 'view_name': 'apps_by_type'},
    {'pattern': '^/statistics/apps\-available\-by\-type/$', 'view_name': 'apps_available_by_type'},
    {'pattern': '^/statistics/apps\-available\-by\-type$', 'view_name': 'apps_available_by_type'},
    {'pattern': '^/statistics/apps\-available\-by\-payment/$', 'view_name': 'apps_available_by_premium'},
    {'pattern': '^/statistics/apps\-available\-by\-payment$', 'view_name': 'apps_available_by_premium'},
    {'pattern': '^/statistics/gross\-revenue/$', 'view_name': 'gross_revenue'},
    {'pattern': '^/statistics/gross\-revenue$', 'view_name': 'gross_revenue'},
    {'pattern': '^/statistics/ratings/$', 'view_name': 'ratings'},
    {'pattern': '^/statistics/ratings$', 'view_name': 'ratings'},
    {'pattern': '^/statistics/abuse-reports/$', 'view_name': 'abuse_reports'},
    {'pattern': '^/statistics/abuse-reports$', 'view_name': 'abuse_reports'},

    // Per app stats:
    {'pattern': '^/statistics/app/([^/<>"\']+)$', 'view_name': 'app_dashboard'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/$', 'view_name': 'app_dashboard'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/installs/$', 'view_name': 'per_app_installs'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/installs$', 'view_name': 'per_app_installs'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/visits/$', 'view_name': 'per_app_visits'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/visits$', 'view_name': 'per_app_visits'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/revenue/$', 'view_name': 'per_app_revenue'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/revenue$', 'view_name': 'per_app_revenue'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/ratings/$', 'view_name': 'per_app_ratings'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/ratings$', 'view_name': 'per_app_ratings'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/abuse\-reports/$', 'view_name': 'per_app_abuse_reports'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/abuse\-reports$', 'view_name': 'per_app_abuse_reports'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/average_rating/$', 'view_name': 'per_app_average_rating'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/average_rating$', 'view_name': 'per_app_average_rating'},

    {'pattern': '^/tests$', 'view_name': 'tests'},
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
    'views/total_visits'
], function() {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        var view = require('views/' + route.view_name);
        route.view = view;
    }
    return routes;
});
})();
