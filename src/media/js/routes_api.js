define('routes_api', [], function() {
    return {
        'apps_added': '/api/v1/stats/global/apps_added_by_premium/',
        'total_developers': '/api/v1/stats/global/total_developers/',
        'total_visits': '/api/v1/stats/global/total_visits/',
        'apps_installed': '/api/v1/stats/global/apps_installed/',
        'apps_by_type': '/api/v1/stats/global/apps_added_by_package/',
        'login': '/api/v1/account/login/'
    };
});
