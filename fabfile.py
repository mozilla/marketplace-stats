import os

from fabric.api import env, execute, lcd, local, parallel, roles, task
from fabdeploytools.rpm import RPMBuild
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
        local('npm install -g commonplace')
        local('commonplace includes')


@task
@roles('web')
@parallel
def _install_package(rpmbuild):
    rpmbuild.install_package()


@task
def deploy():
    with lcd(MARKETPLACE_STATS):
        ref = local('git rev-parse HEAD', capture=True)

    rpmbuild = RPMBuild(name='marketplace-stats',
                        env=settings.ENV,
                        ref=ref,
                        cluster=settings.CLUSTER,
                        domain=settings.DOMAIN)
    rpmbuild.build_rpm(ROOT, ['marketplace-stats'])

    execute(_install_package, rpmbuild)

    rpmbuild.clean()
