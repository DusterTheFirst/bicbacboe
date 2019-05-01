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

/** The Options to create a Lobby */
export interface ILobbySettings {
    /** The name of the Lobby */
    name: string;
    /** The optional passphrase of the lobby */
    passphrase: string;
    /** The type of lobby */
    lobbyType: LobbyType;
    /** The shuffle type (Only for team/tournament style modes) */
    matchmakingType?: MatchmakingType;
    /** If the ability for spectators is enabled */
    spectators: boolean;
}

/** A lobby */
export interface ILobby extends ILobbySettings {
    /** The lobby ID */
    id: string;
}

/** The different types of lobbies */
export enum LobbyType {
    /** A one versus one lobby (classic) */
    OneOnOne,
    /** A tournament style lobby (free for all) */
    Tournament,
    /** A team based lobby */
    Teams
}

// TODO: https://www.printyourbrackets.com/types-of-tournaments.html
/** The type of matchmaking to employ in the lobby */
export enum MatchmakingType {
    SingleElimination,
    DoubleElimination,
    TripleElimination,
    /** Round Robin based matchmaking */
    RoundRobin,
    ThreeGameGuarantee,
    Consolation,
    CompassDraw
}