define('user_helpers',
    ['regions', 'user', 'utils'],
    function(regions, user, utils) {

    var initialArgs = utils.getVars();

    function region(default_) {
        if ('region' in initialArgs &&
            initialArgs.region &&
            regions.REGION_CHOICES_SLUG[initialArgs.region]) {
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
