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

import { ILobby, RestErrorCode } from "@bicbacboe/api";
import { useContext, useState, useEffect } from "react";
import { APIContext } from "../App";

/** Hook to connect to the API */
export function useAPI() {
    return useContext(APIContext);
}

export function useLobby(id: string) {
    let [lobby, setLobby] = useState<ILobby | RestErrorCode>();
    let client = useAPI();

    useEffect(() => {
        client.getLobby(id).then(setLobby);
    }, [id, client]);

    return lobby;
}

export function useLobbies(): [ILobby[] | RestErrorCode | undefined, () => void] {
    let [lobbies, setLobbies] = useState<ILobby[] | RestErrorCode>();
    let client = useAPI();

    const reloadLobbies = () => {
        setLobbies(undefined);
        client.getLobbies().then(setLobbies);
    };

    useEffect(() => {
        reloadLobbies();
    }, [client]);

    return [lobbies, reloadLobbies];
}