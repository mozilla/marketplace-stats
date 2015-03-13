define('routes',
    ['core/router'],
    function(router) {
    var root = '^/statistics/';

    router.addRoutes([
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
    ]);

    router.api.addRoutes({
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
    });

    router.api.addProcessor(function() {
        return {
            lang: (navigator.l10n && navigator.l10n.language) ||
                  navigator.language || navigator.userLanguage
        };
    });
});
