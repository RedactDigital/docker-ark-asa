FROM ubuntu:22.04

# Env variables
ENV USER=arkuser
ENV UID=1000
ENV GID=1000
ENV STEAM_COMPAT_CLIENT_INSTALL_PATH="/home/${USER}/.steam/steam"

# STEAM_COMPAT_DATA_PATH tells the app where to look for its folders when using proton. This is
# useful for when a game is installed in a different location than the default steam library
ENV STEAM_COMPAT_DATA_PATH="/home/${USER}/.steam/steam/steamapps/compatdata/${ASA_APPID}"

ENV BASE_DIR=/opt
ENV STEAMCMD_DIR=${BASE_DIR}/steamcmd
ENV MANAGER_DIR=${BASE_DIR}/manager
ENV ARK_DIR="/home/${USER}/.steam/steam/steamapps/common/ARK Survival Ascended Dedicated Server"
ENV LOG_FILE="${ARK_DIR}/ShooterGame/Saved/Logs/ShooterGame.log"

# Log file 2 is used for the ark server api
ENV LOG_FILE_2="${ARK_DIR}/ShooterGame/Saved/Logs/ShooterGame_2.log"
ENV PID_FILE="${ARK_DIR}/.server.pid"

# Add the ark user and group that will be used to run the server
RUN set -ex; \
    groupadd --gid ${GID} ${USER}; \
    useradd --create-home --shell /bin/bash --uid ${UID} --gid ${GID} ${USER}

# Create the required directories and set the permissions
RUN set -ex; \
    mkdir -p ${ARK_DIR}; \
    chown -R ${USER}:${USER} ${ARK_DIR}

RUN set -ex; \
    mkdir -p ${STEAM_COMPAT_DATA_PATH}; \
    chown -R ${USER}:${USER} ${STEAM_COMPAT_DATA_PATH}

# Because steam is a 32 bit app, we need to add the i386 architecture
RUN set -ex; \
    dpkg --add-architecture i386

# Add the ll alias
RUN echo "alias ll='ls -alF'" >> /home/${USER}/.bashrc

# Install the required packages
RUN set -ex; \
    apt update; \
    apt install -y --no-install-recommends \
    wget \
    curl \
    jq \
    sudo \
    iproute2 \
    locales \
    procps \
    software-properties-common \
    dbus \
    lib32gcc-s1 \
    vim \
    unzip \
    python3 \
    python3-pip \
    python3-setuptools \
    python3-venv \
    pipx;

# Download steamcmd
RUN set -ex; \
    mkdir -p ${STEAMCMD_DIR}; \
    cd ${STEAMCMD_DIR}; \
    curl "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -

# Download Proton GE
RUN set -ex; \
    curl -sLOJ "$(curl -s https://api.github.com/repos/GloriousEggroll/proton-ge-custom/releases/latest | grep browser_download_url | cut -d\" -f4 | egrep .tar.gz)"; \
    tar -xzf GE-Proton*.tar.gz -C /usr/local/bin/ --strip-components=1; \
    rm GE-Proton*.*

RUN set -ex; \
    wget -nv -O /usr/bin/winetricks https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks; \
    chmod +x /usr/bin/winetricks

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

# Configure locale for unicode
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8

# Install Cleanup
RUN set -ex; \
    apt-get -y autoremove; \
    apt-get -y clean; \
    rm -rf /var/lib/apt/lists/*; \
    rm -rf /tmp/*; \
    rm -rf /var/tmp/*

# Set permissions
RUN set -ex; \
    chown -R ${USER}:${USER} /home/${USER}/.steam; \
    chown -R ${USER}:${USER} ${STEAMCMD_DIR}

COPY --chown=${USER} --chmod=755 ./scripts/setup/entrypoint.sh /entrypoint.sh
COPY --chown=${USER} --chmod=755 ./scripts/manager ${MANAGER_DIR}

RUN set -ex; \
    ln -s ${MANAGER_DIR}/manager.sh /usr/local/bin/manager

# Switch to the ark user so that the server files are owned by the ark user
USER ${USER}

# Install protontricks so we can install the required components for ark server api
# This needs done after the we switch to the user so that the files are owned by the user
RUN set -ex; \
    pipx ensurepath; \
    pipx install protontricks;

WORKDIR ${ARK_DIR}

#on startup enter start.sh script
ENTRYPOINT ["/entrypoint.sh"]
