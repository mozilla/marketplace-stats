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

    // Per app stats:
    {'pattern': '^/statistics/app/([^/<>"\']+)$', 'view_name': 'app_dashboard'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/$', 'view_name': 'app_dashboard'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/installs/$', 'view_name': 'per_app_installs'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/installs$', 'view_name': 'per_app_installs'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/visits/$', 'view_name': 'per_app_visits'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/visits$', 'view_name': 'per_app_visits'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/revenue/$', 'view_name': 'per_app_revenue'},
    {'pattern': '^/statistics/app/([^/<>"\']+)/revenue$', 'view_name': 'per_app_revenue'},

    {'pattern': '^/tests$', 'view_name': 'tests'},
    {'pattern': '^/debug$', 'view_name': 'debug'}
];

define(
    'routes',
    routes.map(function(i) {return 'views/' + i.view_name;}),
    function() {
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            var view = require('views/' + route.view_name);
            route.view = view;
        }
        return routes;
    }
);

})();
