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

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useMedia } from "react-use-media";
import CreateMenu from "../components/menu/CreateMenu";
import JoinMenu from "../components/menu/JoinMenu";
import { ChoiceMenu, DashboardMenu } from "../components/menu/Menus";

/** The main menu where the user changes settings and creates or joins Lobbies */
export default function MainMenuView() {
    return (
        <div className="mainmenu">
            <h1 className="title">BicBacBoe</h1>
            <Menu/>
        </div>
    );
}

/** Switch the menu shown according to if the device is a mobile device */
function Menu() {

    if (useMedia({ maxWidth: 599 })) {
        // If mobile, seperate screens into seperate routes
        return (
            <div className="choice">
                <Switch>
                    <Route path="/" exact={true} component={ChoiceMenu} />
                    <Route path="/join" component={JoinMenu} />
                    <Route path="/create" component={CreateMenu} />
                </Switch>
            </div>
        );
    } else {
        // If desktop, show all screens together like a dashboard
        return (
            <div className="dashboard">
                <Switch>
                    <Route path="/" exact={true} component={DashboardMenu} />

                    {/* Redirect from mobile urls if given, or if size changes */}
                    <Redirect from="/join" to="/" />
                    <Redirect from="/create" to="/" />
                </Switch>
            </div>
        );
    }
}