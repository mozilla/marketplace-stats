define('routes_api', [], function() {
    return {
        // Global stats:
        'apps_added': '/api/v1/stats/global/apps_added_by_premium/',
        'total_developers': '/api/v1/stats/global/total_developers/',
        'total_visits': '/api/v1/stats/global/total_visits/',
        'apps_installed': '/api/v1/stats/global/apps_installed/',
        'apps_by_type': '/api/v1/stats/global/apps_added_by_package/',
        'gross_revenue': '/api/v1/stats/global/revenue/',
        'apps_available_by_type': '/api/v1/stats/global/apps_available_by_package/',
        'apps_available_by_premium': '/api/v1/stats/global/apps_available_by_premium/',
        'ratings': '/api/v1/stats/global/ratings/',
        'abuse_reports': '/api/v1/stats/global/abuse_reports/',
        'global_totals': '/api/v1/stats/global/totals/',

        // Per app stats:
        'per_app_installs': '/api/v1/stats/app/{0}/installs/',
        'per_app_visits': '/api/v1/stats/app/{0}/visits/',
        'per_app_ratings': '/api/v1/stats/app/{0}/ratings/',
        'per_app_revenue': '/api/v1/stats/app/{0}/revenue/',
        'per_app_abuse_reports': '/api/v1/stats/app/{0}/abuse_reports/',
        'per_app_average_rating': '/api/v1/stats/app/{0}/average_rating/',

        // Totals API. (Includes multiple totals in one request)
        'per_app_totals': '/api/v1/stats/app/{0}/totals/',

        // App lookup:
        'app': '/api/v1/apps/app/{0}/',

        'login': '/api/v1/account/login/'
    };
});
