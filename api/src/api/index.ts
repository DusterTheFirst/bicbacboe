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

import axios, { TypedAxiosInstance } from "restyped-axios";
import { IAccount, IAPITypings } from "../";
import { ILobby, ILobbySettings } from "../rest/data/lobby";

export class Client {
    private readonly client: TypedAxiosInstance<IAPITypings>;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8080" : `${process.env.PUBLIC_URL}/api`
        });
    }

    public async createLobby(settings: ILobbySettings): Promise<ILobby> {
        let response = await this.client.post("/lobby", settings);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    }

    public async login(): Promise<IAccount> {
        let response = await this.client.get("/login");

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    }

    public async getLobby(id: string): Promise<ILobby> {
        let response = await this.client.get<"/lobby/:id">(`/lobby/${id}`);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    }

    public async updateLobby(id: string, settings: ILobbySettings): Promise<ILobby> {
        let response = await this.client.put<"/lobby/:id">(`/lobby/${id}`, settings);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    }
}