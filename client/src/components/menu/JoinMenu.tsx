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

import React from "react";
import { useLobbies } from "../../hooks/useAPI";

/** The section of the menu dedicated to finding and joining a Lobby */
export default function JoinMenu() {
    let [lobbies, reloadLobbies] = useLobbies();

    return (
        <div className="join">
            <button onClick={reloadLobbies}>Reload</button>
            <pre>
                {JSON.stringify(lobbies, undefined, 4)}
            </pre>
        </div>
    );
}