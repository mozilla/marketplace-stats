define('settings', ['l10n', 'settings_local', 'underscore'], function(l10n, settings_local, _) {
    var gettext = l10n.gettext;

    return _.defaults(settings_local, {
        init_module: 'marketplace',
        default_locale: 'en-US',
        api_url: 'http://' + window.location.hostname,  // No trailing slash, please.

        storage_version: '0',

        param_whitelist: ['q', 'sort'],

        model_prototypes: {
            // Dummy prototypes to facilitate testing
            'dummy': 'id',
            'dummy2': 'id'
        },

        fragment_error_template: 'errors/fragment.html',
        pagination_error_template: 'errors/pagination.html',

        tracking_id: 'UA-36116321-6',

        REGION_CHOICES_SLUG: {
            'worldwide': gettext('Worldwide'),
            'br': gettext('Brazil'),
            'co': gettext('Colombia'),
            'me': gettext('Montenegro'),
            'pl': gettext('Poland'),
            'rs': gettext('Serbia'),
            'es': gettext('Spain'),
            'uk': gettext('United Kingdom'),
            'us': gettext('United States'),
            've': gettext('Venezuela')
        },

        timing_url: '',  // TODO: figure this out

        persona_unverified_issuer: 'login.persona.org',

        title_suffix: 'Firefox Marketplace Statistics'
    });
});
