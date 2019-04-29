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

import { AcceptedMimeTypes, IGETRequestMap } from "@bicbacboe/api";
import { NextFunction, Request, RequestHandler, Response, Send } from "express";
import messagepack from "msgpack-lite";

/** An adapted and typed GET request response */
interface IGETRequestHandlerResponse<K extends keyof IGETRequestMap> extends Response {
    /** Function to send a response back to the client */
    send(body: IGETRequestMap[K]): Response;
    /** Function to send an error back to the client */
    // TODO: error(body: IPOSTRequestMap[K]["res"]): Response;
    /** The express provided send() fn */
    _send: Send;
}

/** An adapted and typed GET request handler */
type IGETRequestHandler<K extends keyof IGETRequestMap> = (req: Request, res: IGETRequestHandlerResponse<K>, next: NextFunction) => void;

/** Wrapper for a GET handler that provides typings aswell as replaces the send function for ease of use */
export function getHandler<K extends keyof IGETRequestMap>(handler: IGETRequestHandler<K>): RequestHandler {
    return (req, res, next) => {
         // Parse Accept header, by default set as JSON
        let Accept = parseMimeType(req.header("Accept"), AcceptedMimeTypes.JSON);

        // tslint:disable: prefer-object-spread
        handler(
            req,
            Object.assign({}, res, {
                _send: res.send,
                send: (body: IGETRequestMap[K]) => {
                    res.contentType(Accept);
                    res.send(serialize(body, Accept));
                }
            }),
            next);
        // tslint:enable: prefer-object-spread
    };
}

export function parseMimeType(mime: string | undefined, fallback: AcceptedMimeTypes): AcceptedMimeTypes {
    if (mime === AcceptedMimeTypes.JSON) {
        return AcceptedMimeTypes.JSON;
    }
    else if (mime === AcceptedMimeTypes.MessagePack) {
        return AcceptedMimeTypes.MessagePack;
    }
    else {
        return fallback;
    }
}

export function serialize<D>(data: D, mime: AcceptedMimeTypes): string | Buffer {
    if (mime === AcceptedMimeTypes.JSON) {
        return JSON.stringify(data);
    } else /* if (mime === AcceptedMimeTypes.MessagePack) */ {
        return messagepack.encode(data);
    }
}

// tslint:disable-next-line: no-any
export function deserialize<D>(data: any, mime: AcceptedMimeTypes): D {
    if (mime === AcceptedMimeTypes.JSON) {
        return JSON.parse(data as string) as D;
    } else /* if (mime === AcceptedMimeTypes.MessagePack) */ {
        return messagepack.decode(data as Buffer | Uint8Array | number[]) as D;
    }
}