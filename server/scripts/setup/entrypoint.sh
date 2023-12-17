#!/bin/bash

#exit on error
set -e

# Install or update ASA server + verify installation
${STEAMCMD_DIR}/steamcmd.sh +login anonymous +app_update ${ASA_APPID} validate +@sSteamCmdForcePlatformType windows +quit

# Install Ark server API files
LATEST_RELEASE=$(curl -s https://api.github.com/repos/ServersHub/ServerAPI/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")')
if [[ -z "${LATEST_RELEASE}" ]]; then
    echo "Failed to get latest release from GitHub API"
    exit 1
fi

if [[ -f "${ARK_DIR}/ShooterGame/Binaries/Win64/AsaApiLoader.exe" ]]; then
    echo "API already installed"
else
    echo "Installing API ${LATEST_RELEASE}"
    wget -q https://github.com/ServersHub/ServerAPI/releases/download/${LATEST_RELEASE}/AsaApi_${LATEST_RELEASE}.zip -O /tmp/AsaApiLoader.zip
    unzip -q /tmp/AsaApiLoader.zip -d "${ARK_DIR}/ShooterGame/Binaries/Win64/"
    rm -rf /tmp/AsaApiLoader.zip
fi

# Install Ark plugins
# wget -q https://gameservershub.com/forums/resources/ark-survival-ascended-arkshop-crossplay-supported.714/download -O /tmp/arkshop.zip
# unzip -q /tmp/arkshop.zip -d "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/"
# rm -rf /tmp/arkshop.zip

#Create file for showing server logs
mkdir -p "${LOG_FILE%/*}" && echo "" >"${LOG_FILE}"
mkdir -p "${LOG_FILE_2%/*}" && echo "" >"${LOG_FILE_2}"

# Start server through manager
echo "" >"${PID_FILE}"
# manager start &

# Register SIGTERM handler to stop server gracefully
trap "manager stop --saveworld" SIGTERM

# Start tail process in the background, then wait for tail to finish.
# This is just a hack to catch SIGTERM signals, tail does not forward
# the signals.
tail -f "${LOG_FILE}" "${LOG_FILE_2}" &
wait $!
