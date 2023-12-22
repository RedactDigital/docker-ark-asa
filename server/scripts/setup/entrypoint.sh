#!/bin/bash

#exit on error
set -e

# Install or update ASA server + verify installation
# ${STEAM_DIR}/steamcmd.sh +force_install_dir ${ARK_DIR} +login anonymous +app_update ${ASA_APPID} validate +@sSteamCmdForcePlatformType windows +quit

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
    wget https://github.com/ServersHub/ServerAPI/releases/download/${LATEST_RELEASE}/AsaApi_${LATEST_RELEASE}.zip -O /tmp/AsaApiLoader.zip
    unzip /tmp/AsaApiLoader.zip -d "${ARK_DIR}/ShooterGame/Binaries/Win64/"
    rm -rf /tmp/AsaApiLoader.zip
fi

if [[ -f "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/ArkShop/ArkShop.dll" ]]; then
    echo "ArkShop already installed"
else
    echo "Installing ArkShop"

    # Login game server hub atm requires a subscription to download the plugin,
    # so for the time being I'm going to download it manually and copy it to an s3 bucket
    wget http://cloud.redact.digital/ark/ArkShop.zip
    unzip ArkShop.zip -d "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/"
    rm -rf ArkShop.zip
fi

if [[ -f "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/TurretManagerFree/TurretManagerFree.dll" ]]; then
    echo "TurretManager already installed"
else
    echo "Installing TurretManager"

    # Login game server hub atm requires a subscription to download the plugin,
    # so for the time being I'm going to download it manually and copy it to an s3 bucket
    wget http://cloud.redact.digital/ark/TurretManagerFreeBETA_1.05.zip
    unzip TurretManagerFreeBETA_1.05.zip -d "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/"
    rm -rf TurretManagerFreeBETA_1.05.zip
fi

if [[ -f "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/AdvancedMessagesAscended/AdvancedMessagesAscended.dll" ]]; then
    echo "AdvancedMessagesAscended already installed"
else
    echo "Installing AdvancedMessagesAscended"

    # Login game server hub atm requires a subscription to download the plugin,
    # so for the time being I'm going to download it manually and copy it to an s3 bucket
    wget http://cloud.redact.digital/ark/AdvancedMessagesAscended_1.0.zip
    unzip AdvancedMessagesAscended_1.0.zip -d "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/"
    rm -rf AdvancedMessagesAscended_1.0.zip
fi

# Create archive dir for logs that we end up moving in the startup script
if [[ ! -d "${ARK_DIR}/ShooterGame/Binaries/Win64/logs/Archive" ]]; then
    mkdir -p "${ARK_DIR}/ShooterGame/Binaries/Win64/logs/Archive"
else
    if ls ${ARK_DIR}/ShooterGame/Binaries/Win64/logs/Archive/*.log 1>/dev/null 2>&1; then
        echo "Archiving old logs"
        mv ${ARK_DIR}/ShooterGame/Binaries/Win64/logs/*.log ${ARK_DIR}/ShooterGame/Binaries/Win64/logs/Archive/
    fi
fi

if [[ ! -d "${ARK_DIR}/ShooterGame/Saved/Logs/Archive" ]]; then
    mkdir -p "${ARK_DIR}/ShooterGame/Saved/Logs/Archive"
else
    if ls ${ARK_DIR}/ShooterGame/Saved/Logs/Archive/*.log 1>/dev/null 2>&1; then
        echo "Archiving old logs"
        mv ${ARK_DIR}/ShooterGame/Saved/Logs/*.log ${ARK_DIR}/ShooterGame/Saved/Logs/Archive/
    fi
fi

#Create file for showing server logs
mkdir -p "${LOG_FILE%/*}" && echo "" >"${LOG_FILE}"
mkdir -p "${API_LOG_FILE%/*}" && echo "" >"${ARK_DIR}/ShooterGame/Binaries/Win64/logs/ArkApi_648_2023-12-22_00-00.log"

# Start server through manager
# manager startApi &

# Register SIGTERM handler to stop server gracefully
trap "manager stop --saveworld" SIGTERM

# Start tail process in the background, then wait for tail to finish.
# This is just a hack to catch SIGTERM signals, tail does not forward
# the signals.
tail -f ${LOG_FILE} ${API_LOG_FILE} &
wait $!
