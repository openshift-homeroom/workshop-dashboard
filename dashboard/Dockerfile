FROM quay.io/openshiftlabs/workshop-terminal:1.1.2

USER root

COPY bin/. /opt/workshop/bin/.
COPY etc/. /opt/workshop/etc/.

COPY gateway/. /opt/workshop/gateway/.

COPY raneto /opt/workshop/raneto

RUN HOME=/opt/workshop/raneto && \
    cd /opt/workshop/raneto && \
    source scl_source enable rh-nodejs8 && \
    npm install --production && \
    npm run gulp

USER 1001
