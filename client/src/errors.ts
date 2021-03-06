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

export enum ErrorCode {
    CannotConnectToServer
}

type Filter<T, U> = T extends U ? T : never;

/** A mapping of error codes to their error message counterparts */
export type ErrorMap = {
    [K in Filter<keyof typeof ErrorCode, string>]: {
        short: string;
        extrainfo?: string;
    }
};

/** TODO: docgen and better layout */
export const ErrorMessages: ErrorMap = {
    CannotConnectToServer: {
        extrainfo: "Check your internet connection or verify the server status",
        short: "Cannot establish a connection to the server"
    }
};