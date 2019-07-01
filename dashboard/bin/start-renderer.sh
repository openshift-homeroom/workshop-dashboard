#!/bin/bash

set -x

set -eo pipefail

export HOME=/opt/workshop/renderer

cd $HOME

URI_ROOT_PATH=/workshop
export URI_ROOT_PATH

if [ x"$JUPYTERHUB_SERVICE_PREFIX" != x"" ]; then
    URI_ROOT_PATH=${JUPYTERHUB_SERVICE_PREFIX%/}/workshop
fi

export PORT=${PORT:-10082}

if [ x"$DOWNLOAD_URL" != x"" ]; then
    node download.js /tmp/workshop "$DOWNLOAD_URL" "$WORKSHOP_FILE"
    export WORKSHOP_DIR=/tmp/workshop
fi

exec npm start
