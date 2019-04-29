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

import { AcceptedMimeTypes, IPOSTRequestMap } from "@bicbacboe/api";
import { NextFunction, Request, RequestHandler, Response, Send } from "express";
import messagepack from "msgpack-lite";

/** An adapted and typed POST request requesr */
interface IPOSTRequestHandlerRequest<K extends keyof IPOSTRequestMap> extends Request{
    /** The body sent */
    body: IPOSTRequestMap[K]["req"];
    /** The unparsed body */
    // tslint:disable-next-line: no-any
    _body: any;
}

/** An adapted and typed POST request response */
interface IPOSTRequestHandlerResponse<K extends keyof IPOSTRequestMap> extends Response {
    /** Function to send a response back to the client */
    send(body: IPOSTRequestMap[K]["res"]): Response;
    /** Function to send an error back to the client */
    // TODO: error(body: IPOSTRequestMap[K]["res"]): Response;
    /** The express provided send() fn */
    _send: Send;
}

/** An adapted and typed POST request handler */
type IPOSTRequestHandler<K extends keyof IPOSTRequestMap> = (req: IPOSTRequestHandlerRequest<K>, res: IPOSTRequestHandlerResponse<K>, next: NextFunction) => void;

/** Wrapper for a POST handler that provides typings aswell as replaces the send function for ease of use */
export function postHandler<K extends keyof IPOSTRequestMap>(handler: IPOSTRequestHandler<K>): RequestHandler {
    return (req: Request, res, next) => {
        // Parse mime type, by default set as JSON
        let ContentType = parseMimeType(req.header("Content-Type"), AcceptedMimeTypes.JSON);
        // Parse Accept header, by default set as JSON
        let Accept = parseMimeType(req.header("Accept"), AcceptedMimeTypes.JSON);

        // console.log(`Content-Type: ${ContentType}, Accept: ${Accept}`);

        let data = deserialize<IPOSTRequestMap[K]["req"]>(req.body, ContentType);

        // tslint:disable: prefer-object-spread
        handler(
            Object.assign({}, req, {
                _body: req.body,
                body: data
            }),
            Object.assign({}, res, {
                _send: res.send,
                send: (body: IPOSTRequestMap[K]["res"]) => {
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