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

import React, { Component } from "react";
import "./MainMenu.scss";

export default class MainMenu extends Component {
    public render() {
        return (
            <div className="mainmenu">
                <h1 className="title">BicBacBoe</h1>
                <div className="playoptions">
                    <div className="join button" onClick={() => alert("join Game")}>Join Game</div>
                    <div className="create button" onClick={() => alert("create Game")}>Create Game</div>
                </div>
            </div>
        )
    }
}