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

import { IClientErrorMap, IClientPayloadMap } from "../ws/client";
import { IWebsocketError, IWebsocketPayload } from "../ws/payloads";
import { IServerErrorMap, IServerPayloadMap } from "../ws/server";

/** A websocket client with typings built in aswell as extra helper functions */
export class WebsocketClient {

    /** The underlying websocket that this connection is built on */
    private readonly socket: WebSocket;

    constructor(url: string) {
        this.socket = new WebSocket(url, "bicbacboe-pv1");
    }

    public on<O extends keyof IServerPayloadMap, D extends IServerPayloadMap[O]>(opcode: O, handler: (data: D) => void) {
        // TODO:
    }

    public onerror<E extends keyof IServerErrorMap, M extends IServerErrorMap[E]>(errorcode: E, handler: (message: M) => void) {
        // TODO:
    }

    public send<O extends keyof IClientPayloadMap, D extends IClientPayloadMap[O]>(opcode: O, data: D) {
        let payload: IWebsocketPayload<O, D> = { data, opcode };
    }

    public error<E extends keyof IClientErrorMap, M extends IClientErrorMap[E]>(errorcode: E, message: M) {
        let error: IWebsocketError<E, M> = { error: errorcode, message };
    }

}

// let client = new WebsocketClient("ewewe");

// client.on(ServerOpcode.AuthSuccess, (data) => {

// });

// client.send(ClientOpcode.Auth, {
//     usertoken: ""
// });