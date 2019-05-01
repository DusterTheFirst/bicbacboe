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

import { HTTPStatusCode } from "./http";

export enum RestErrorCode {
    EndpointDoesNotExist = 1000,
    FatalError
}

export interface IRestError<M extends ValuesOf<typeof RestErrorCode>> {
    code: M;
    error: (typeof RestErrorCode)[M];
    message: string;
}

type Filter<T, U> = T extends U ? T : never;
type ValuesOf<T> = T[keyof T];

export type RestErrorMap = {
    [K in ValuesOf<typeof RestErrorCode>]: {
        error: IRestError<K>;
        status: HTTPStatusCode;
    }
};

/** TODO: docgen and better layout */
export const RestErrorMessages: RestErrorMap = {
    [RestErrorCode.EndpointDoesNotExist]: {
        error: {
            code: RestErrorCode.EndpointDoesNotExist,
            error: "EndpointDoesNotExist",
            message: "The endpoint requested does not exist"
        },
        status: HTTPStatusCode.NotFound
    },
    [RestErrorCode.FatalError]: {
        error: {
            code: RestErrorCode.FatalError,
            error: "FatalError",
            message: "There was a fatal, uncaught error in the server"
        },
        status: HTTPStatusCode.InternalServerError
    }
};