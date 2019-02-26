#!/bin/bash

set -x

set -eo pipefail

if [ x"$JUPYTERHUB_SERVICE_PREFIX" != x"" ]; then
    export RAILS_RELATIVE_URL_ROOT=${JUPYTERHUB_SERVICE_PREFIX%/}/workshop
    export RAILS_ASSETS_PATH=${JUPYTERHUB_SERVICE_PREFIX%/}/workshop/public
else
    export RAILS_RELATIVE_URL_ROOT=/workshop
    export RAILS_ASSETS_PATH=/workshop/public
fi

export SECRET_KEY_BASE="$(openssl rand -hex 64)"
export RAILS_SERVE_STATIC_FILES=true

export RAILS_ENV=development

export RAILS_LOG_TO_STDOUT=true
export LOG_TO_STDOUT=true

export PORT=${PORT:-10082}

export HOME=/opt/workshop/workshopper

cd $HOME

exec bundle exec rackup -p ${PORT} -E $RAILS_ENV
