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
import { IPOSTRequestMap} from "../protocol/rest";
import { ILobby, ILobbySettings } from "../protocol/rest/post/lobby";

const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:8080" : `${process.env.PUBLIC_URL}/api`;

export async function createLobby(settings: ILobbySettings): Promise<ILobby> {
    return POST("/lobby", settings);
}

async function POST<P extends keyof IPOSTRequestMap, B extends IPOSTRequestMap[P]["req"], R extends IPOSTRequestMap[P]["res"]>(path: P, body: B): Promise<R> {
    let response = await fetch(`${APIURL}${path}`, {
        body: msgpack.encode(body),
        headers: {
            "Accept": "application/msgpack",
            "Content-Type": "application/msgpack",
            "User-Agent": "BicBacBoe",
        },
        method: "post",
    });

    if (response.ok) {
        return response.json() as Promise<R>;
    } else {
        throw response.status;
    }

}