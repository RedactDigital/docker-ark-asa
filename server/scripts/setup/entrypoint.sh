#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

#exit on error
set -e

function installServerAPI {
    # https://gameservershub.com/forums/resources/ark-survival-ascended-serverapi-crossplay-supported.683/
    LATEST_RELEASE=$1

    echo -e "Installing latest API ${GREEN}${LATEST_RELEASE}${NC}"
    wget https://github.com/ServersHub/ServerAPI/releases/download/${LATEST_RELEASE}/AsaApi_${LATEST_RELEASE}.zip -O /tmp/AsaApi.zip

    mkdir -p /tmp/AsaApi
    unzip /tmp/AsaApi.zip -d /tmp/AsaApi

    mkdir -p "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/Permissions"

    mv -f /tmp/AsaApi/AsaApiLoader.exe "${ARK_DIR}/ShooterGame/Binaries/Win64/AsaApiLoader.exe"
    mv -f /tmp/AsaApi/AsaApiLoader.pdb "${ARK_DIR}/ShooterGame/Binaries/Win64/AsaApiLoader.pdb"
    mv -f /tmp/AsaApi/msdia140.dll "${ARK_DIR}/ShooterGame/Binaries/Win64/msdia140.dll"
    mv -f /tmp/AsaApi/ArkApi/pdbignores.txt "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/pdbignores.txt"
    mv -f /tmp/AsaApi/ArkApi/AsaApi.dll "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/AsaApi.dll"
    mv -f /tmp/AsaApi/ArkApi/AsaApi.pdb "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/AsaApi.pdb"
    mv -f /tmp/AsaApi/ArkApi/Plugins/Permissions/Permissions.dll "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/Permissions/Permissions.dll"
    mv -f /tmp/AsaApi/ArkApi/Plugins/Permissions/Permissions.pdb "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/Permissions/Permissions.pdb"
    mv -f /tmp/AsaApi/ArkApi/Plugins/Permissions/PluginInfo.json "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/Permissions/PluginInfo.json"

    # TODO - Add some checks to see if the api already has config files in it or not. If it doesn't then we need to copy them over from the zip file

    rm -rf /tmp/AsaApiLoader.zip
    rm -rf /tmp/AsaApi

    if [[ ! -f "${ARK_DIR}/ShooterGame/Binaries/last_server_api_release.txt" ]]; then
        rm -rf "${ARK_DIR}/ShooterGame/Binaries/last_server_api_release.txt"
        echo "${LATEST_RELEASE}" >"${ARK_DIR}/ShooterGame/Binaries/last_server_api_release.txt"
    else
        echo "${LATEST_RELEASE}" >"${ARK_DIR}/ShooterGame/Binaries/last_server_api_release.txt"
    fi
}

function installArkShopPlugin {
    # https://gameservershub.com/forums/resources/ark-survival-ascended-arkshop-crossplay-supported.714/
    LATEST_RELEASE=$1

    echo -e "Installing latest ArkShop ${GREEN}${LATEST_RELEASE}${NC}"
    # Login game server hub atm requires a subscription to download the plugin,
    # so for the time being I'm going to download it manually and copy it to an s3 bucket
    wget "https://cdn.redact.digital/ark/ArkShop_${LATEST_RELEASE}.zip" -O /tmp/ArkShop.zip
    unzip /tmp/ArkShop.zip -d /tmp/ArkShop

    mkdir -p "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/ArkShop"

    mv -f /tmp/ArkShop/ArkShop/ArkShop.dll "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/ArkShop/ArkShop.dll"
    mv -f /tmp/ArkShop/ArkShop/ArkShop.pdb "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/ArkShop/ArkShop.pdb"
    mv -f /tmp/ArkShop/ArkShop/PluginInfo.json "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/ArkShop/PluginInfo.json"
    mv -f /tmp/ArkShop/ArkShop/Commented.json "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/ArkShop/Commented.json"

    if [[ ! -f "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/ArkShop/config.json" ]]; then
        mv -f /tmp/ArkShop/ArkShop/Config.json "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/ArkShop/config.json"
    fi

    rm -rf /tmp/ArkShop.zip
    rm -rf /tmp/ArkShop

    if [[ ! -f "${ARK_DIR}/ShooterGame/Binaries/last_arkshop_release.txt" ]]; then
        rm -rf "${ARK_DIR}/ShooterGame/Binaries/last_arkshop_release.txt"
        echo "${LATEST_RELEASE}" >"${ARK_DIR}/ShooterGame/Binaries/last_arkshop_release.txt"
    else
        echo "${LATEST_RELEASE}" >"${ARK_DIR}/ShooterGame/Binaries/last_arkshop_release.txt"
    fi
}

function installTurretManagerPlugin {
    # https://gameservershub.com/forums/resources/turret-manager-free.749/
    LATEST_RELEASE=$1

    echo -e "Installing latest TurretManager ${GREEN}${LATEST_RELEASE}${NC}"
    # Login game server hub atm requires a subscription to download the plugin,
    # so for the time being I'm going to download it manually and copy it to an s3 bucket
    wget "http://cdn.redact.digital/ark/TurretManagerFREE${LATEST_RELEASE}.zip" -O /tmp/TurretManager.zip
    unzip /tmp/TurretManager.zip -d /tmp/TurretManager

    mkdir -p "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/TurretManagerFree"

    mv -f /tmp/TurretManager/TurretManagerFree/TurretManagerFree.dll "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/TurretManagerFree/TurretManagerFree.dll"
    mv -f /tmp/TurretManager/TurretManagerFree/TurretManagerFree.pdb "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/TurretManagerFree/TurretManagerFree.pdb"
    mv -f /tmp/TurretManager/TurretManagerFree/PluginInfo.json "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/TurretManagerFree/PluginInfo.json"

    if [[ ! -f "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/TurretManagerFree/config.json" ]]; then
        mv -f /tmp/TurretManager/TurretManagerFree/Config.json "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/TurretManagerFree/config.json"
    fi

    rm -rf /tmp/TurretManager.zip
    rm -rf /tmp/TurretManager

    if [[ ! -f "${ARK_DIR}/ShooterGame/Binaries/last_turret_manager_release.txt" ]]; then
        rm -rf "${ARK_DIR}/ShooterGame/Binaries/last_turret_manager_release.txt"
        echo "${LATEST_RELEASE}" >"${ARK_DIR}/ShooterGame/Binaries/last_turret_manager_release.txt"
    else
        echo "${LATEST_RELEASE}" >"${ARK_DIR}/ShooterGame/Binaries/last_turret_manager_release.txt"
    fi
}

function installAdvancedMessagesPlugin {
    # https://gameservershub.com/forums/resources/advanced-messages-ascended.739/
    LATEST_RELEASE=$1

    echo -e "Installing latest AdvancedMessages ${GREEN}${LATEST_RELEASE}${NC}"
    # Login game server hub atm requires a subscription to download the plugin,
    # so for the time being I'm going to download it manually and copy it to an s3 bucket
    wget "http://cdn.redact.digital/ark/AdvancedMessagesAscended_${LATEST_RELEASE}.zip" -O "/tmp/AdvancedMessagesAscended.zip"

    # Turn off error checking for this command becaues it keeps giving the "appears to use backslashes as path separators" error
    # which doesn't seem to be affecting the actual unzipping of the file
    set +e
    unzip "/tmp/AdvancedMessagesAscended.zip" -d "/tmp/AdvancedMessagesAscended"
    set -e

    mkdir -p "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/AdvancedMessagesAscended"

    mv -f "/tmp/AdvancedMessagesAscended/AdvancedMessagesAscended/AdvancedMessagesAscended.dll" "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/AdvancedMessagesAscended/AdvancedMessagesAscended.dll"
    mv -f "/tmp/AdvancedMessagesAscended/AdvancedMessagesAscended/AdvancedMessagesAscended.pdb" "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/AdvancedMessagesAscended/AdvancedMessagesAscended.pdb"
    mv -f "/tmp/AdvancedMessagesAscended/AdvancedMessagesAscended/PluginInfo.json" "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/AdvancedMessagesAscended/PluginInfo.json"
    mv -f "/tmp/AdvancedMessagesAscended/AdvancedMessagesAscended/config_help.json" "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/AdvancedMessagesAscended/config_help.json"

    if [[ ! -f "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/AdvancedMessagesAscended/config.json" ]]; then
        mv -f "/tmp/AdvancedMessagesAscended/AdvancedMessagesAscended/config.json" "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/AdvancedMessagesAscended/config.json"
    fi

    rm -rf "/tmp/AdvancedMessagesAscended.zip"
    rm -rf "/tmp/AdvancedMessagesAscended"

    if [[ ! -f "${ARK_DIR}/ShooterGame/Binaries/last_advanced_messages_release.txt" ]]; then
        rm -rf "${ARK_DIR}/ShooterGame/Binaries/last_advanced_messages_release.txt"
        echo "${LATEST_RELEASE}" >"${ARK_DIR}/ShooterGame/Binaries/last_advanced_messages_release.txt"
    else
        echo "${LATEST_RELEASE}" >"${ARK_DIR}/ShooterGame/Binaries/last_advanced_messages_release.txt"
    fi
}

# Install or update ASA server + verify installation
${STEAM_DIR}/steamcmd.sh +force_install_dir ${ARK_DIR} +login anonymous +app_update ${ASA_APPID} validate +@sSteamCmdForcePlatformType windows +quit

# Find latest release of Server API
ARK_SERVER_API_LATEST_RELEASE=$(curl -s https://api.github.com/repos/ServersHub/ServerAPI/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")')
if [[ -z "${ARK_SERVER_API_LATEST_RELEASE}" ]]; then
    echo -e "${RED}Failed to get latest release from GitHub API${NC}"
    exit 1
fiWW

# Server API
if [[ -f "${ARK_DIR}/ShooterGame/Binaries/Win64/AsaApiLoader.exe" ]]; then
    LAST_RELEASE=""
    if [[ -f "${ARK_DIR}/ShooterGame/Binaries/last_server_api_release.txt" ]]; then
        LAST_RELEASE=$(cat "${ARK_DIR}/ShooterGame/Binaries/last_server_api_release.txt")
    fi

    if [[ "${LAST_RELEASE}" == "${ARK_SERVER_API_LATEST_RELEASE}" ]]; then
        echo -e "Server API is up to date: ${GREEN}${ARK_SERVER_API_LATEST_RELEASE}${NC}"
    else
        installServerAPI "${ARK_SERVER_API_LATEST_RELEASE}"
    fi
else
    installServerAPI "${ARK_SERVER_API_LATEST_RELEASE}"
fi

# Find latest release of ArkShop
ARK_SHOP_LATEST_RELEASE=1.06

# ArkShop plugin
if [[ -f "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/ArkShop/ArkShop.dll" ]]; then
    LAST_RELEASE=""
    if [[ -f "${ARK_DIR}/ShooterGame/Binaries/last_arkshop_release.txt" ]]; then
        LAST_RELEASE=$(cat "${ARK_DIR}/ShooterGame/Binaries/last_arkshop_release.txt")
    fi

    if [[ "${LAST_RELEASE}" == "${ARK_SHOP_LATEST_RELEASE}" ]]; then
        echo -e "ArkShop is up to date: ${GREEN}${ARK_SHOP_LATEST_RELEASE}${NC}"
    else
        installArkShopPlugin "${ARK_SHOP_LATEST_RELEASE}"
    fi
else
    installArkShopPlugin "${ARK_SHOP_LATEST_RELEASE}"
fi

# Find latest release of TurretManager
TURRET_MANAGER_LATEST_RELEASE=1.08

# TurretManager plugin
if [[ -f "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/TurretManagerFree/TurretManagerFree.dll" ]]; then
    LAST_RELEASE=""
    if [[ -f "${ARK_DIR}/ShooterGame/Binaries/last_turret_manager_release.txt" ]]; then
        LAST_RELEASE=$(cat "${ARK_DIR}/ShooterGame/Binaries/last_turret_manager_release.txt")
    fi

    if [[ "${LAST_RELEASE}" == "${TURRET_MANAGER_LATEST_RELEASE}" ]]; then
        echo -e "TurretManager is up to date: ${GREEN}${TURRET_MANAGER_LATEST_RELEASE}${NC}"
    else
        installTurretManagerPlugin "${TURRET_MANAGER_LATEST_RELEASE}"
    fi
else
    installTurretManagerPlugin "${TURRET_MANAGER_LATEST_RELEASE}"
fi

# Find latest release of AdvancedMessages
ADVANCED_MESSAGES_LATEST_RELEASE=1.2

# AdvancedMessages plugin
if [[ -f "${ARK_DIR}/ShooterGame/Binaries/Win64/ArkApi/Plugins/AdvancedMessagesAscended/AdvancedMessagesAscended.dll" ]]; then
    LAST_RELEASE=""
    if [[ -f "${ARK_DIR}/ShooterGame/Binaries/last_advanced_messages_release.txt" ]]; then
        LAST_RELEASE=$(cat "${ARK_DIR}/ShooterGame/Binaries/last_advanced_messages_release.txt")
    fi

    if [[ "${LAST_RELEASE}" == "${ADVANCED_MESSAGES_LATEST_RELEASE}" ]]; then
        echo -e "AdvancedMessages is up to date: ${GREEN}${ADVANCED_MESSAGES_LATEST_RELEASE}${NC}"
    else
        installAdvancedMessagesPlugin "${ADVANCED_MESSAGES_LATEST_RELEASE}"
    fi
else
    installAdvancedMessagesPlugin "${ADVANCED_MESSAGES_LATEST_RELEASE}"
fi

# Create archive dir for logs that we end up moving in the startup script
if [[ ! -d "${ARK_DIR}/ShooterGame/Binaries/Win64/logs/Archive" ]]; then
    mkdir -p "${ARK_DIR}/ShooterGame/Binaries/Win64/logs/Archive"

    if ls ${ARK_DIR}/ShooterGame/Binaries/Win64/logs/*.log 1>/dev/null 2>&1; then
        echo -e "${RED}Archiving old logs${NC}"
        mv ${ARK_DIR}/ShooterGame/Binaries/Win64/logs/*.log ${ARK_DIR}/ShooterGame/Binaries/Win64/logs/Archive/
    fi
else
    if ls ${ARK_DIR}/ShooterGame/Binaries/Win64/logs/*.log 1>/dev/null 2>&1; then
        echo -e "${RED}Archiving old logs${NC}"
        mv ${ARK_DIR}/ShooterGame/Binaries/Win64/logs/*.log ${ARK_DIR}/ShooterGame/Binaries/Win64/logs/Archive/
    fi
fi

if [[ ! -d "${ARK_DIR}/ShooterGame/Saved/Logs/Archive" ]]; then
    mkdir -p "${ARK_DIR}/ShooterGame/Saved/Logs/Archive"

    if ls ${ARK_DIR}/ShooterGame/Saved/Logs/*.log 1>/dev/null 2>&1; then
        echo -e "${RED}Archiving old logs${NC}"
        mv ${ARK_DIR}/ShooterGame/Saved/Logs/*.log ${ARK_DIR}/ShooterGame/Saved/Logs/Archive/
    fi
else
    if ls ${ARK_DIR}/ShooterGame/Saved/Logs/*.log 1>/dev/null 2>&1; then
        echo -e "${RED}Archiving old logs${NC}"
        mv ${ARK_DIR}/ShooterGame/Saved/Logs/*.log ${ARK_DIR}/ShooterGame/Saved/Logs/Archive/
    fi
fi

#Create file for showing server logs
mkdir -p "${LOG_FILE%/*}" && echo "Start of File" >"${LOG_FILE}"
mkdir -p "${API_LOG_FILE%/*}" && echo "Start of File" >"${ARK_DIR}/ShooterGame/Binaries/Win64/logs/ArkApi_648_2023-12-22_00-00.log"

# Start server through manager
# manager startApi &

# Register SIGTERM handler to stop server gracefully
trap "manager stop --saveworld" SIGTERM
echo -e "${GREEN}------------------------ Server is ready${NC}. Use 'manager' command to manage the server. ${GREEN}------------------------${NC}"

tail -f ${LOG_FILE} &

wait $!
