/*!
 * Copyright (C) 2019  Zachary Kohnen
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { ILobbySettings } from "@bicbacboe/api";
import { ChangeEvent, useState } from "react";

type FilterKeys<T, U> = Not<{ [K in keyof T]: T[K] extends U ? K : never }[keyof T], undefined>;
type Not<T, U> = T extends U ? never : T;

/** A hook to edit a lobbies settings with added helpers for editing the settings */
export interface ILobbySettingsHook {
    /** Helper function to simplify linking the form value in the state to a checkbox element by returning the needed attributes */
    linkCheckbox<K extends FilterKeys<ILobbySettings, boolean>>(key: K): {
        onChange(e: ChangeEvent<HTMLInputElement>): void;
        checked: ILobbySettings[K];
    };
    /** Helper function to simplify linking the form value in the state to an input element by returning the needed attributes */
    linkInput<K extends FilterKeys<ILobbySettings, string>>(key: K): {
        onChange(e: ChangeEvent<HTMLInputElement>): void;
        value: ILobbySettings[K];
    };
    /** Helper function to simplify linking the form value in the state to a RadioGroup element by returning the needed attributes */
    linkRadio<K extends keyof ILobbySettings>(key: K): {
        onChange(value: ILobbySettings[K]): void;
        selectedValue: ILobbySettings[K];
    };
    /** The set lobby settings */
    lobbySettings: ILobbySettings;
    /** If the settings differ from the saved ones */
    isEdited: boolean;
}

/** A hook to edit a lobbies settings with added helpers for editing the settings */
export default function useLobbySettings(defaultState: ILobbySettings): ILobbySettingsHook {
    let [lobbySettings, setLobbySettings] = useState(defaultState);
    let [isEdited, setEdited] = useState(false);

    function changeSettings<K extends keyof ILobbySettings>(key: K, value: ILobbySettings[K]) {
        setLobbySettings(prestate => ({ ...prestate, [key]: value }));
        setEdited(true);
    }

    return {
        isEdited,
        linkCheckbox: (key) => {
            return {
                checked: lobbySettings[key],
                onChange: (e) => changeSettings(key, e.target.checked)
            };
        },
        linkInput: (key) => {
            return {
                onChange: (e) => changeSettings(key, e.target.value),
                value: lobbySettings[key]
            };
        },
        linkRadio: (key) => {
            return {
                onChange: (value) => changeSettings(key, value),
                selectedValue: lobbySettings[key]
            };
        },
        lobbySettings
    };
}
