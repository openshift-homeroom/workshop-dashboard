#!/bin/bash

if [ x"$WORKSHOPS_URLS" != x"" ]; then
    exec /opt/workshop/bin/start-workshopper.sh
else
    exec /opt/workshop/bin/start-raneto.sh
fi
