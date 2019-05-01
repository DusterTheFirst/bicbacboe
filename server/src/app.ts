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

import { AcceptedMimeTypes, RestErrorMessages, RestErrorCode } from "@bicbacboe/api";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import expressws from "express-ws";
import helmet from "helmet";
import { getHandler } from "./getHandler";
import { generateLobbyID, generateUserID } from "./id";
import { postHandler } from "./postHandler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.raw({
    type: AcceptedMimeTypes.MessagePack
}));
app.use(bodyParser.text({
    type: AcceptedMimeTypes.JSON
}));

// const wsRouter = express.Router();
// wsRouter.ws("/game-listing", (ws, req) => {

// });

// app.use("/ws", wsRouter);

app.post("/lobby", postHandler<"/lobby">((req, res) => {
    console.log(req.body);
    let lobbyID = generateLobbyID();
    res.send({
        id: lobbyID,
        settings: req.body,
        websocket: `/ws/lobby/${lobbyID}`
    });
}));

app.get("/login", getHandler<"/login">((req, res) => {
    res.send({
        id: generateUserID()
    });
}));

// TODO: CORRECT TYPE
app.use((req, res) => {
    res.status(RestErrorMessages[RestErrorCode.EndpointDoesNotExist].status)
        .send(RestErrorMessages[RestErrorCode.EndpointDoesNotExist].error);
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(RestErrorMessages[RestErrorCode.FatalError].status)
        .json(RestErrorMessages[RestErrorCode.FatalError].error);
    console.log(err);
});
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     const error: IFatalRESTError = {

//     }
//     res.json(error);
// });

const port = process.env.PORT === undefined ? 8080 : process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));

// console.log(ClientErrorCode);

// TODO: LISTEM
// process.once("SIGTERM", (signal) => {
//     // TODO: Graceful shutdown and close connections
//     console.log(signal);
// });

// process.once("SIGINT", (signal) => {
//     // TODO:
//     console.log(signal);
//     process.exit(128);
// });
