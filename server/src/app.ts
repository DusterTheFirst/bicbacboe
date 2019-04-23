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

// tslint:disable: match-default-export-name
import express from "express";
import expressws from "express-ws";
// tslint:enable: match-default-export-name
// import {  } from "../api/build/client";

const app = express();
const wsapp = expressws(app);

// const wsRouter = express.Router();
// wsRouter.ws("/game-listing", (ws, req) => {

// });

// app.use("/ws", wsRouter);

const port = process.env.PORT === undefined ? 8080 : process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));

// console.log(ClientErrorCode);