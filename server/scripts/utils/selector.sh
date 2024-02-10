#!/bin/bash

function Menu {
    # You shouldn't need to edit anything below this line unless you are changing
    # the behavior of the script
    local blue_text='\033[0;36m'
    local bold_text='\033[1m'
    local green_text='\033[0;32m'
    local color_reset='\033[0m'

    # pass in in the first argument the instructions and seconnd the options
    instructions="\n${blue_text}${bold_text}$1${color_reset} [Use arrows to move cursor, Enter to select]\n"
    options=("${@:2}")

    local indicator_arrow="${green_text}${bold_text}>${color_reset}"
    local selected_options=0
    local length=${#options[@]}
    local instructions_printed=false

    # Print the menu
    function Print_Menu {
        # Clear what was previously printed
        tput cuu $length
        tput ed

        if [[ $instructions_printed == false ]]; then
            echo -e $instructions
            instructions_printed=true
        fi

        for ((i = 0; i < length; i++)); do
            if [[ $i -eq $selected_options ]]; then
                echo -e "${indicator_arrow} ${options[$i]}"
            else
                echo "  ${options[$i]}"
            fi
        done
    }

    Print_Menu

    # Read the key pressed
    while read -rsn1 key; do
        case $key in
        A) # Up
            if [[ $selected_options -gt 0 ]]; then
                ((selected_options--))
            fi
            Print_Menu

            ;;
        B) # Down
            if [[ $selected_options -lt $((length - 1)) ]]; then
                ((selected_options++))
            fi
            Print_Menu
            ;;

        "") # Enter
            break
            ;;
        esac
    done

    return $selected_options
}
