define('settings_app',
    ['core/settings', 'settings_local'],
    function(settings, settingsLocal) {

    settings._extend({
        api_url: 'http://' + window.location.hostname,
        api_cdn_whitelist: {},

        api_param_blacklist: ['region'],
        param_whitelist: ['q', 'sort'],

        model_prototypes: {
            'app': 'slug',
        },

        fragment_error_template: 'errors/fragment.html',
        pagination_error_template: 'errors/pagination.html',

        timing_url: '',

        title_suffix: 'Firefox Marketplace Statistics',
        switches: []
    });

    settings._extend(settingsLocal);
});
