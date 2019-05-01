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

import { getLobby, ILobby, RestErrorCode, RestErrorMessages } from "@bicbacboe/api";
import React, { useEffect, useState } from "react";
import { Link, Prompt } from "react-router-dom";
import useRouter from "use-react-router";

export function Lobby() {
    let { match } = useRouter<{ lobbyID: string }>();
    let lobby = useLobby(match.params.lobbyID);

    let error = typeof lobby === "number"
        ? RestErrorMessages[lobby].error
        : false;

    return (
        <div className="lobby">
            {
                error !== false ?
                <pre>{JSON.stringify(error, undefined, 4)}</pre> :
                (
                    <>
                        <Prompt when={lobby !== undefined} message="Are you sure you want to leave this lobby" />
                        Info for lobby #{match.params.lobbyID}
                        {lobby === undefined ? <div>Loading...</div> : <pre>{JSON.stringify(lobby, undefined, 4)}</pre>}
                        <Link to="/">Go home</Link>
                    </>
                )
            }
        </div>
    );
}

function useLobby(id: string) {
    let [lobby, setLobby] = useState<ILobby | RestErrorCode>();

    useEffect(() => {
        getLobby(id).then(setLobby);
    }, [id]);

    return lobby;
}