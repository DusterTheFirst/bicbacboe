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

import { ILobby, RestErrorCode, RestErrorMessages } from "@bicbacboe/api";
import IAPITypings from "@bicbacboe/api/build/rest/api";
import bodyParser from "body-parser";
import Collection from "collection";
import compression from "compression";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import expressws from "express-ws";
import helmet from "helmet";
import RestypedRouter from "restyped-express-async";
import { generateLobbyID, generateUserID } from "./id";

const app = express();
const router = RestypedRouter<IAPITypings>(app);

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

// const wsRouter = express.Router();
// wsRouter.ws("/game-listing", (ws, req) => {

// });

// app.use("/ws", wsRouter);

const lobbies: Collection<string, ILobby> = new Collection();

router.post("/lobby", async (req) => {
    console.log(req.body);
    let lobby = {
        id: generateLobbyID(),
        ... req.body
    };
    lobbies.set(lobby.id, lobby);

    return lobby;
});

// TODO: 404 if not found
router.get("/lobby/:id", async (req) => {
    let lobby = lobbies.get(req.params.id);
    if (lobby !== undefined) {
        return lobby;
    } else {
        throw new Error("OH NOES");
    }
});

router.get("/login", async () => {
    return {
        id: generateUserID()
    };
});

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
