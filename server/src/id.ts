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

// TODO: nanoid-good if ids pose a problem
import generate from "nanoid/generate";

/** Base 30 Alphabet (no look alikes) */
export const Easy = "23456789abcdefghijkmnpqrstwxyz";

/** Base 62 (Full) Alphabet */
export const Full = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/** Generate a NanoID for a game */
export function generateGameID() {
    return generate(Full, 4);
}

/** Generate a NanoID for a lobby */
export function generateLobbyID() {
    return generate(Easy, 8);
}

/** Generate a NanoID for a user */
export function generateUserID() {
    return generate(Full, 16);
}