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

import msgpack from "msgpack-lite";
import { AcceptedMimeTypes, IGETRequestMap, IPOSTRequestMap, RestErrorCode, RestErrorMap, IRestError } from "../rest";
import { ILobbySettings } from "../rest/data/lobby";

const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:8080" : `${process.env.PUBLIC_URL}/api`;

export async function createLobby(settings: ILobbySettings) {
    return POST("/lobby", settings);
}

export async function login() {
    return GET("/login");
}

export async function getLobby(id: string) {
    return GET(`/lobby/${id}` as "/lobby/:id");
}

async function POST<P extends keyof IPOSTRequestMap, B extends IPOSTRequestMap[P]["req"], R extends IPOSTRequestMap[P]["res"]>(path: P, body: B): Promise<R> {
    let response = await fetch(`${APIURL}${path}`, {
        body: msgpack.encode(body),
        headers: {
            "Accept": AcceptedMimeTypes.MessagePack,
            "Content-Type": AcceptedMimeTypes.MessagePack,
            "User-Agent": "BicBacBoe",
        },
        method: "post",
    });

    if (response.ok) {
        return msgpack.decode(new Uint8Array(await response.arrayBuffer())) as R;
    } else {
        // FIXME:
        throw response.status;
    }
}

async function GET<P extends keyof IGETRequestMap, R extends IGETRequestMap[P]>(path: P): Promise<R | RestErrorCode> {
    let response = await fetch(`${APIURL}${path}`, {
        headers: {
            "Accept": AcceptedMimeTypes.MessagePack,
            "User-Agent": "BicBacBoe",
        },
        method: "get",
    });

    if (response.ok) {
        return msgpack.decode(new Uint8Array(await response.arrayBuffer())) as R;
    } else {
        // FIXME: msgpack
        return (await response.json() as IRestError<keyof RestErrorMap>).code;
    }
}