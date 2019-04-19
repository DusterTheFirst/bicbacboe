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

import { IError, IPayload } from "./payloads";

/** Payloads sent from the server to the client */
export type ServerPayload =
    IPayload<ServerOpcode.AuthSuccess, ServerPayloadData.IAuthSuccess>;

/** Opcodes to identify server payloads */
export enum ServerOpcode {
    /** Reply to authentication payload (Verified identity) */
    AuthSuccess
}

/** All of the interfaces defining the payload data */
export namespace ServerPayloadData {
    /** Successful authentication */
    export interface IAuthSuccess {
        /** The verified identity of the user */
        user: string /* User */;
    }
}

/** Errors sent by the server to the client */
export type ServerError =
    IError<ServerErrorCode, ServerErrorData.IAuthFailure>;

/** The error codes to identify errors */
export enum ServerErrorCode {
    /** Reply to authentication payload (Rejected identity) */
    AuthFailure
}

/** All of the interfaces defining the error data */
export namespace ServerErrorData {
    /** Reason for rejection of auth token */
    export enum AuthFailureReason {
        /** The auth token was an invalid format or otherwise malformed */
        Unparsable,
        /** The auth token does not match its hash */
        Tampered,
        /** The token has passed its expiration date */
        Expired
    }
    /** Unsuccessful authentication */
    export interface IAuthFailure {
        /** The reason for the rejection */
        reason: string;
    }
}