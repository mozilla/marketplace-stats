define('user_helpers', ['settings', 'user', 'utils'], function(settings, user, utils) {

    var initialArgs = utils.getVars();

    function region(default_) {
        if ('region' in initialArgs &&
            initialArgs.region &&
            settings.REGION_CHOICES_SLUG[initialArgs.region]) {
            return initialArgs.region;
        }
        return user.get_setting('region_override') ||
               default_ ||
               '';
    }

    return {
        region: region
    };
});
