FROM quay.io/openshiftlabs/workshop-terminal:2.3.0

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

RUN HOME=/opt/workshop/reveal.js && \
    mkdir /opt/workshop/reveal.js && \
    cd /opt/workshop/reveal.js && \
    curl -L -o src.tar.gz https://github.com/hakimel/reveal.js/archive/3.7.0.tar.gz && \
    tar --strip-components 1 -xf src.tar.gz && \
    rm src.tar.gz

USER 1001
