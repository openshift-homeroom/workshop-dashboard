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
    export WORKSHOP_DIR=/tmp/workshop

    node download.js "$WORKSHOP_DIR" "$DOWNLOAD_URL" "$WORKSHOP_FILE"

    if [ ! -f "$WORKSHOP_DIR/config.js" ]; then
        unset WORKSHOP_FILE
    fi
fi

exec npm start
