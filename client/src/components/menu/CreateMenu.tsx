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

import React, { ChangeEvent, Component } from "react";
import { Prompt } from "react-router-dom";
import { FilterObjectKeysByType } from "../../utilityTypes";

interface ICreateMenuState {
    gameName: string;
    edited: boolean;
}

/** The section of the menu dedicated to creating and starting a game */
export class CreateMenu extends Component<{}, ICreateMenuState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            edited: false,
            gameName: ""
        };
    }

    public render() {
        return (
            <div className="create-menu">
                <Prompt when={this.state.edited} message="Are you sure you want to leave? You will lose all of the settings for this game" />
                <div className="header">Create a Game</div>
                <label htmlFor="createmenu-game-name">Game Name</label>
                <input type="text" id="createmenu-game-name" placeholder="Bob's Game" value={this.state.gameName} onChange={this.updateFormValue("gameName")} />
            </div>
        );
    }

    private readonly updateFormValue = (formValue: FilterObjectKeysByType<ICreateMenuState, string>) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            this.setState({ [formValue]: e.target.value, edited: true });
        };
    }
}
