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

import { IError, IPayload } from "../payloads";

/** Payloads sent from the client from the server */
export type ClientPayload =
    IPayload<ClientOpcode.Auth, ClientPayloadData.IAuth>;

/** Opcodes to identify client payloads */
export enum ClientOpcode {
    /** Authentication payload (Broadcasts identity to the server) */
    Auth
}

export namespace ClientPayloadData {
    /** Authentication payload (Broadcasts identity to the server) */
    export interface IAuth {
        /** The JWT token describing the user */
        usertoken?: string;
    }
}

/** Errors sent from the client to the server */
export type ClientErrors =
    IError<ClientErrorCode.UnknownError, Error>;

/** The error codes to identify errors */
export enum ClientErrorCode {
    /** An unknown error that has not been caught */
    UnknownError
}
