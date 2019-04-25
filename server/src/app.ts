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

import { AcceptedMimeTypes } from "@bicbacboe/api";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import expressws from "express-ws";
import Hashids from "hashids";
import helmet from "helmet";
import uuid from "uuid/v4";
import { postHandler } from "./postHandler";

// TODO:
// HASHIDS for game/lobby codes (or https://www.npmjs.com/package/shortid)
// UUID or other long uuids for User IDs and game ids

const hashids = new Hashids("bicbacboeiscool", 6);
const app = express();
const wsapp = expressws(app);

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

let i = 0;
app.post("/lobby", postHandler((req, res) => {
    let id = uuid();
    res.send({
        externalUID: id,
        internalUID: hashids.encode(i)
    });

    i++;
}));

const port = process.env.PORT === undefined ? 8080 : process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));

// console.log(ClientErrorCode);