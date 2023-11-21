FROM debian:bullseye-slim

# Env variables
ENV USER=arkuser
ENV UID=1000
ENV GID=1000
ENV TINI_VERSION=v0.19.0
ENV STEAM_COMPAT_CLIENT_INSTALL_PATH=/home/${USER}/.steam/steam
ENV STEAM_COMPAT_DATA_PATH=/home/${USER}/.steam/steam/steamapps/compatdata/2430930
ENV LOG_FILE=/opt/arkserver/ShooterGame/Saved/Logs/ShooterGame.log
ENV PID_FILE=/opt/arkserver/.server.pid

# Add the ark user and group that will be used to run the server
RUN groupadd --gid ${GID} ${USER} && \
    useradd --create-home --shell /bin/bash --uid ${UID} --gid ${GID} ${USER}

# The folder that will contain the server files
RUN mkdir /opt/arkserver

# Because steam is a 32 bit app, we need to add the i386 architecture
RUN dpkg --add-architecture i386

# Add the ll alias
RUN echo "alias ll='ls -alF'" >> /home/${USER}/.bashrc

# Install the required packages
RUN set -ex && apt update && apt install -y --no-install-recommends \
    wget \
    curl \
    jq \
    sudo \
    iproute2 \
    procps \
    software-properties-common \
    dbus \
    lib32gcc-s1 \
    vim;

# Download steamcmd
RUN set -ex; \
    mkdir -p /opt/steamcmd; \
    cd /opt/steamcmd; \
    curl "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -

# Download Proton GE
RUN set -ex; \
    curl -sLOJ "$(curl -s https://api.github.com/repos/GloriousEggroll/proton-ge-custom/releases/130226909 | grep browser_download_url | cut -d\" -f4 | egrep .tar.gz)"; \
    tar -xzf GE-Proton*.tar.gz -C /usr/local/bin/ --strip-components=1; \
    rm GE-Proton*.*

# Proton Fix machine-id
RUN set -ex; \
    rm -f /etc/machine-id; \
    dbus-uuidgen --ensure=/etc/machine-id; \
    rm /var/lib/dbus/machine-id; \
    dbus-uuidgen --ensure

# install rcon
RUN set -ex; \
    cd /tmp/; \
    curl -sSL https://github.com/gorcon/rcon-cli/releases/download/v0.10.3/rcon-0.10.3-amd64_linux.tar.gz > rcon.tar.gz; \
    tar xvf rcon.tar.gz; \
    mv rcon-0.10.3-amd64_linux/rcon /usr/local/bin/

# Install tini
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

# Install Cleanup
RUN apt-get -y autoremove \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/* \
    && rm -rf /var/tmp/*

# Set permissions
RUN set -ex \
    chown -R ${USER}:${USER} /opt/arkserver; \
    chown -R ${USER}:${USER} /opt/steamcmd

COPY --chown=${USER} --chmod=755 ./scripts/start.sh /opt/start.sh
COPY --chown=${USER} --chmod=755 ./scripts/manager /opt/manager

RUN ln -s /opt/manager/manager.sh /usr/local/bin/manager

# Switch to the ark user so that the server files are owned by the ark user
USER ${USER}

# This needs done after the user is created so that the files are owned by the ark user
WORKDIR /opt/arkserver

#on startup enter start.sh script
ENTRYPOINT ["/tini", "--", "/opt/start.sh"]
