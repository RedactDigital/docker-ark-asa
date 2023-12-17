FROM oven/bun:1.0.4

# Env variables
ENV USER=bun

# Install the required packages
RUN set -ex; \
    apt update && apt install -y --no-install-recommends \
    vim

# Install Cleanup
RUN set -ex; \
    echo "alias ll='ls -alF'" >> /home/${USER}/.bashrc \
    && apt-get -y autoremove \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/* \
    && rm -rf /var/tmp/*

# Switch to the ark user so that the server files are owned by the ark user
USER ${USER}
