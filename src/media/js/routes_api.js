define('routes_api', [], function() {

    // List API routes here.
    // E.g.:
    // {
    //     "route": "/foo/bar/{0}",
    //     "another_route": "/foo/bar/{0}/asdf"
    // }
    return {
        'apps_added': '/api/v1/stats/global/apps_added_by_premium/',
        'login': '/api/v1/account/login/'
    };
});
