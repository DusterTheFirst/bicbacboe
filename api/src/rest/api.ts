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

import { ILobby, ILobbySettings } from "./data/lobby";
import { IAccount } from "./data/login";

// TODO: include errors in response smthn like that json thing
export interface IAPITypings {
    "/lobby": {
        POST: {
            body: ILobbySettings;
            response: ILobby;
        };
    };
    "/lobby/:id": {
        GET: {
            params: {
                id: string;
            };
            response: ILobby;
        };
        PUT: {
            params: {
                id: string;
            };
            body: ILobbySettings;
            response: ILobby;
        };
    };
    "/login": {
        GET: {
            response: IAccount;
        };
    };
}