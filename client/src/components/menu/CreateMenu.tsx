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

import ILobbySettings, { LobbyType, MatchmakingType } from "@bicbacboe/api/build/types/lobbySettings";
import React, { ChangeEvent, Component } from "react";
import { Radio, RadioGroup } from "react-radio-group";
import { Prompt } from "react-router-dom";

type StringPropertyNames<T> = Not<{ [K in keyof T]: T[K] extends string ? K : never }[keyof T], undefined>;
type Not<T, U> = T extends U ? never : T;

interface ICreateMenuState {
    settings: ILobbySettings;
    edited: boolean;
}

/** The section of the menu dedicated to creating a lobby */
export class CreateMenu extends Component<{}, ICreateMenuState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            edited: false,
            settings: {
                lobbyType: LobbyType.OneOnOne,
                name: "",
                passphrase: "",
                spectators: false
            }
        };
    }

    public render() {
        return (
            <div className="create-menu">
                <Prompt when={this.state.edited} message="Are you sure you want to leave? You will lose all of the settings for this game" />
                <div className="header">Create a Lobby</div>
                <label>
                    Lobby Name
                    <input type="text" placeholder="Bob's Lobby" {... this.linkInputToFormValue("name")} />
                </label>
                <label>
                Lobby Passphrase (Optional)
                    <input type="password" placeholder="Bob is cool" {... this.linkInputToFormValue("passphrase")} />
                </label>
                <RadioGroup {... this.linkRadioToFormValue("lobbyType")}>
                    Lobby Type
                    <label>
                        <Radio value={LobbyType.OneOnOne} />One v One
                    </label>
                    <label>
                        <Radio value={LobbyType.Tournament} disabled={true}  />Tournament
                    </label>
                    <label>
                        <Radio value={LobbyType.Teams} disabled={true} />Teams
                    </label>
                </RadioGroup>
                <RadioGroup {... this.linkRadioToFormValue("matchmakingType")} hidden={this.state.settings.lobbyType === LobbyType.OneOnOne}>
                    Matchmaking Type
                    <label>
                        <Radio value={MatchmakingType.SingleElimination} disabled={true}  />
                        Single Elimination
                    </label>
                    <label>
                        <Radio value={MatchmakingType.DoubleElimination} disabled={true}  />
                        Double Elimination
                    </label>
                    <label>
                        <Radio value={MatchmakingType.TripleElimination} disabled={true}  />
                        Triple Elimination
                    </label>
                    <label>
                        <Radio value={MatchmakingType.RoundRobin} disabled={true}  />
                        Round Robin
                    </label>
                    <label>
                        <Radio value={MatchmakingType.ThreeGameGuarantee} disabled={true}  />
                        3 Game Guarantee
                    </label>
                    <label>
                        <Radio value={MatchmakingType.Consolation} disabled={true}  />
                        Consolation
                    </label>
                    <label>
                        <Radio value={MatchmakingType.CompassDraw} disabled={true}  />
                        Compass Draw
                    </label>
                </RadioGroup>
            </div>
        );
    }

    /** Helper function to simplify linking the form value in the state to an input element by returning the needed attributes */
    private readonly linkInputToFormValue = (key: StringPropertyNames<ILobbySettings>) => {
        return {
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value;
                this.setState(prestate => ({ settings: { ...prestate.settings, [key]: value }, edited: true }));
            },
            value: this.state.settings[key]
        };
    }
    /** Helper function to simplify linking the form value in the state to a RadioGroup element by returning the needed attributes */
    private readonly linkRadioToFormValue = (key: keyof ILobbySettings) => {
        return {
            onChange: (value: ILobbySettings[typeof key]) => {
                this.setState(prestate => ({ settings: { ...prestate.settings, [key]: value }, edited: true }));
            },
            selectedValue: this.state.settings[key]
        };
    }
}
