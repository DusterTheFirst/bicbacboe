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

import { LobbyType, MatchmakingType } from "@bicbacboe/api";
import React, { useState } from "react";
import { Radio, RadioGroup } from "react-radio-group";
import { Prompt } from "react-router-dom";
import useRouter from "use-react-router";
import { useAPI } from "../../hooks/useAPI";
import useLobbySettings from "../../hooks/useLobbySettings";

/** The section of the menu dedicated to creating a lobby */
export default function CreateMenu() {
    let { isEdited, lobbySettings, linkCheckbox, linkInput, linkRadio } = useLobbySettings({
        lobbyType: LobbyType.OneOnOne,
        name: "",
        passphrase: "",
        spectators: false
    });
    let [ navigatingAway, setNavigatingAway ] = useState(false);
    let { history } = useRouter();
    let client = useAPI();

    const createLobbyFn = async () => {
        let lobby = await client.createLobby(lobbySettings);
        setNavigatingAway(true);
        history.push(`/lobby/${lobby.id}`);
    };

    return (
        <div className="create-menu">
            <Prompt when={isEdited && !navigatingAway} message="Are you sure you want to leave? You will lose all of the settings for this game" />
            <div className="header">Create a Lobby</div>
            <label>
                Lobby Name
                <input type="text" {...linkInput("name")} />
            </label>
            <label>
                Lobby Passphrase (Optional)
                <input type="text" {...linkInput("passphrase")} />
            </label>
            <RadioGroup {...linkRadio("lobbyType")}>
                Lobby Type
                <label>
                    <Radio value={LobbyType.OneOnOne} />
                    One on One
                </label>
                <label>
                    <Radio value={LobbyType.Tournament} disabled={true} />
                    Tournament
                </label>
                <label>
                    <Radio value={LobbyType.Teams} disabled={true} />
                    Teams
                </label>
            </RadioGroup>
            <RadioGroup {...linkRadio("matchmakingType")} hidden={lobbySettings.lobbyType === LobbyType.OneOnOne}>
                Matchmaking Type
                <label>
                    <Radio value={MatchmakingType.SingleElimination} disabled={true} />
                    Single Elimination
                </label>
                <label>
                    <Radio value={MatchmakingType.DoubleElimination} disabled={true} />
                    Double Elimination
                </label>
                <label>
                    <Radio value={MatchmakingType.TripleElimination} disabled={true} />
                    Triple Elimination
                </label>
                <label>
                    <Radio value={MatchmakingType.RoundRobin} disabled={true} />
                    Round Robin
                </label>
                <label>
                    <Radio value={MatchmakingType.ThreeGameGuarantee} disabled={true} />
                    3 Game Guarantee
                </label>
                <label>
                    <Radio value={MatchmakingType.Consolation} disabled={true} />
                    Consolation
                </label>
                <label>
                    <Radio value={MatchmakingType.CompassDraw} disabled={true} />
                    Compass Draw
                </label>
            </RadioGroup>
            <label>
                Enable spectators
                <input type="checkbox" {...linkCheckbox("spectators")} />
            </label>
            <button onClick={createLobbyFn}>Create Lobby</button>
        </div>
    );
}
