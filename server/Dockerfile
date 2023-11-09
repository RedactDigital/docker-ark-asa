FROM debian:bullseye-slim

# Env variables
ENV USER=arkuser
ENV UID=1000
ENV GID=1000

# Add the ark user and group that will be used to run the server
RUN groupadd --gid ${GID} ${USER} && \
    useradd --create-home --shell /bin/bash --uid ${UID} --gid ${GID} ${USER} && \
    usermod -aG sudo ${USER}

RUN mkdir /opt/arkserver

# Because steam is a 32 bit app, we need to add the i386 architecture
RUN dpkg --add-architecture i386

# Install the required packages
RUN set -ex && apt update && apt install -y --no-install-recommends \
    wget \
    iproute2 \
    gnupg2 \
    software-properties-common \
    libntlm0 \
    winbind \
    xvfb \
    xauth \
    libncurses5-dev:i386 \
    libncurses6 \
    dbus \
    libgdiplus \
    lib32gcc-s1;

RUN set -ex && apt install -y \
    alsa-tools \
    libpulse0 \
    pulseaudio \
    libpulse-dev \
    libasound2 \
    libao-common \
    gnutls-bin \
    gnupg \
    locales \
    numactl \
    cabextract \
    curl \
    python3 \
    python3-pip \
    python3-setuptools \
    sudo \
    procps \
    vim \
    cron;

# Add unicode support
RUN locale-gen en_US.UTF-8
ENV LANG 'en_US.UTF-8'
ENV LANGUAGE 'en_US:en'

# Download steamcmd
RUN set -ex; \
    mkdir -p /opt/steamcmd; \
    cd /opt/steamcmd; \
    curl "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -

# Download Proton GE
RUN set -ex; \
    curl -sLOJ "$(curl -s https://api.github.com/repos/GloriousEggroll/proton-ge-custom/releases/latest | grep browser_download_url | cut -d\" -f4 | egrep .tar.gz)"; \
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


# Switch to the ark user so that the server files are owned by the ark user
USER ${USER}

# This needs done after the user is created so that the files are owned by the ark user
WORKDIR /home/${USER}

COPY --chown=${USER} --chmod=755 ./scripts/entrypoint.sh /entrypoint.sh
COPY --chown=${USER} --chmod=755 ./scripts/manager.sh /usr/local/bin/manager
COPY --chown=${USER} --chmod=755 ./scripts/start.sh /opt/arkserver/start.sh

CMD ["/bin/bash", "/entrypoint.sh"]
