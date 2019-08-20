#!/bin/bash

set -x

if [ -f /opt/workshop/envvars/workshop.sh ]; then
    set -a
    . /opt/workshop/envvars/workshop.sh
    set +a
fi

if [ -f /opt/app-root/envvars/workshop.sh ]; then
    set -a
    . /opt/app-root/envvars/workshop.sh
    set +a
fi

exec /opt/workshop/bin/start-renderer.sh
