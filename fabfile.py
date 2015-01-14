import os

from fabric.api import env, execute, lcd, local, parallel, roles, task
from fabdeploytools import helpers
import fabdeploytools.envs

import deploysettings as settings


env.key_filename = settings.SSH_KEY
fabdeploytools.envs.loadenv(os.path.join('/etc/deploytools/envs',
                                         settings.CLUSTER))
MARKETPLACE_STATS = os.path.dirname(__file__)
ROOT = os.path.dirname(MARKETPLACE_STATS)


@task
def pre_update(ref):
    with lcd(MARKETPLACE_STATS):
        local('git fetch')
        local('git fetch -t')
        local('git reset --hard %s' % ref)


@task
def update():
    with lcd(MARKETPLACE_STATS):
        local('npm install')
        local('make install')
        local('cp src/media/js/settings_local_hosted.js src/media/js/settings_local.js')
        local('make build')
        local('node_modules/.bin/commonplace langpacks')


@task
def build():
    with lcd(MARKETPLACE_STATS):
        local('npm install')
        local('make install')
        local('cp src/media/js/settings_local_hosted.js '
              'src/media/js/settings_local.js')
        local('make build')
        local('node_modules/.bin/commonplace langpacks')


@task
def deploy_jenkins():
    rpmbuild = helpers.build_rpm(name='marketplace-stats',
                                 env=settings.ENV,
                                 cluster=settings.CLUSTER,
                                 domain=settings.DOMAIN,
                                 root=ROOT,
                                 package_dirs=['marketplace-stats'])

    rpmbuild.local_install()
    rpmbuild.remote_install(['web'])


@task
@roles('web')
@parallel
def _install_package(rpmbuild):
    rpmbuild.install_package()


@task
def deploy():
    with lcd(MARKETPLACE_STATS):
        ref = local('git rev-parse HEAD', capture=True)

    rpmbuild = helpers.deploy(name='marketplace-stats',
                              env=settings.ENV,
                              cluster=settings.CLUSTER,
                              domain=settings.DOMAIN,
                              root=ROOT,
                              deploy_roles=['web'],
                              package_dirs=['marketplace-stats'])

