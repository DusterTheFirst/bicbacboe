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

import { getLobby, ILobby } from "@bicbacboe/api";
import React, { useEffect, useState } from "react";
import useRouter from "use-react-router";

export function Lobby() {
    let { match } = useRouter();
    let lobby = useLobby("0");

    return (
        <div className="lobby">
            <pre>{JSON.stringify(match, undefined, 4)}</pre>
            <pre>{JSON.stringify(lobby, undefined, 4)}</pre>
            Lobby
        </div>
    );
}

function useLobby(id: string): undefined | ILobby {
    let [lobby, setLobby] = useState<ILobby>();

    useEffect(() => {
        getLobby(id).then(setLobby);
    }, [id]);

    return lobby;
}