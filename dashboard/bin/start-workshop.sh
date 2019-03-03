#!/bin/bash

set -x

if [ x"$WORKSHOPS_URLS" != x"" ]; then
    exec /opt/workshop/bin/start-workshopper.sh
fi

if [ -f /opt/app-root/workshop/_workshop.yml ]; then
    export WORKSHOPS_URLS="file:///opt/app-root/workshop/_workshop.yml"
    #export CONTENT_URL_PREFIX=file:///opt/app-root/workshop
    exec /opt/workshop/bin/start-workshopper.sh
fi

if [ -f /opt/app-root/src/workshop/_workshop.yml ]; then
    export WORKSHOPS_URLS="file:///opt/app-root/src/workshop/_workshop.yml"
    #export CONTENT_URL_PREFIX=file:///opt/app-root/src/workshop
    exec /opt/workshop/bin/start-workshopper.sh
fi

exec /opt/workshop/bin/start-raneto.sh
