(function() {

// Please leave quotes around keys! They're needed for Space Heater.
var routes = window.routes = [
    {'pattern': '^/stats/?$', 'view_name': 'homepage'},
    {'pattern': '^/$', 'view_name': 'homepage'},

    {'pattern': '^/stats/apps\-added\-by\-payment/$', 'view_name': 'apps_added'},
    {'pattern': '^/stats/total\-developers/$', 'view_name': 'total_developers'},
    {'pattern': '^/stats/total\-visits/$', 'view_name': 'total_visits'},
    {'pattern': '^/stats/apps\-installed/$', 'view_name': 'apps_installed'},
    {'pattern': '^/stats/apps\-installed\-total/$', 'view_name': 'apps_installed_total'},
    {'pattern': '^/stats/apps\-by\-type/$', 'view_name': 'apps_by_type'},
    {'pattern': '^/stats/apps\-available\-by\-type/$', 'view_name': 'apps_available_by_type'},
    {'pattern': '^/stats/apps\-available\-by\-payment/$', 'view_name': 'apps_available_by_premium'},
    {'pattern': '^/stats/gross\-revenue/$', 'view_name': 'gross_revenue'},

    // Per app stats:
    {'pattern': '^/stats/app/([^/<>"\']+)$', 'view_name': 'app_dashboard'},
    {'pattern': '^/stats/app/([^/<>"\']+)/$', 'view_name': 'app_dashboard'},
    {'pattern': '^/stats/app/([^/<>"\']+)/installs/$', 'view_name': 'per_app_installs'},
    {'pattern': '^/stats/app/([^/<>"\']+)/visits/$', 'view_name': 'per_app_visits'},
    {'pattern': '^/stats/app/([^/<>"\']+)/revenue/$', 'view_name': 'per_app_revenue'},

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
