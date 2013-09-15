(function() {

// Please leave quotes around keys! They're needed for Space Heater.
var routes = window.routes = [
    {'pattern': '^/$', 'view_name': 'homepage'},

    {'pattern': '^/apps\-added\-by\-payment/$', 'view_name': 'apps_added'},
    {'pattern': '^/total\-developers/$', 'view_name': 'total_developers'},
    {'pattern': '^/total\-visits/$', 'view_name': 'total_visits'},
    {'pattern': '^/apps\-installed/$', 'view_name': 'apps_installed'},
    {'pattern': '^/apps\-by\-type/$', 'view_name': 'apps_by_type'},

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
