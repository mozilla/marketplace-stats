define('settings', ['l10n', 'settings_local', 'underscore'], function(l10n, settings_local, _) {
    var gettext = l10n.gettext;

    return _.defaults(settings_local, {
        init_module: 'main',
        default_locale: 'en-US',
        api_url: 'http://' + window.location.hostname,  // No trailing slash, please.

        storage_version: '0',

        param_whitelist: ['q', 'sort'],

        model_prototypes: {
            'app': 'slug',

            // Dummy prototypes to facilitate testing
            'dummy': 'id',
            'dummy2': 'id'
        },

        fragment_error_template: 'errors/fragment.html',
        pagination_error_template: 'errors/pagination.html',

        tracking_id: 'UA-36116321-6',

        // A list of regions and their L10n mappings.
        REGION_CHOICES_SLUG: {
            'worldwide': gettext('Worldwide'),
            'ar': gettext('Argentina'),
            'br': gettext('Brazil'),
            'cn': gettext('China'),
            'co': gettext('Colombia'),
            'de': gettext('Germany'),
            'gr': gettext('Greece'),
            'hu': gettext('Hungary'),
            'mx': gettext('Mexico'),
            'me': gettext('Montenegro'),
            'pe': gettext('Peru'),
            'pl': gettext('Poland'),
            'rs': gettext('Serbia'),
            'es': gettext('Spain'),
            'uk': gettext('United Kingdom'),
            'us': gettext('United States'),
            'uy': gettext('Uruguay'),
            've': gettext('Venezuela')
        },

        timing_url: '',  // TODO: figure this out

        persona_unverified_issuer: 'login.persona.org',

        title_suffix: 'Firefox Marketplace Statistics'
    });
});
