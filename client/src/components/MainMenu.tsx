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
import Media from "react-media";
import { Redirect, Route, Switch } from "react-router-dom";
import { CreateMenu } from "./menu/CreateMenu";
import { JoinMenu } from "./menu/JoinMenu";
import { ChoiceMenu, DashboardMenu } from "./menu/MenuTypes";

/** The main menu where the user changes settings and creates or joins games */
export default class MainMenu extends Component {
    public render() {
        return (
            <div className="mainmenu">
                <h1 className="title">BicBacBoe</h1>
                <Media query={{ maxWidth: 599 }} children={this.MenuSwitch} />
            </div>
        );
    }

    /** Switch the menu shown according to if the device is a mobile device */
    private readonly MenuSwitch = (isChoice: boolean) => {
        if (isChoice) {
            // If mobile, seperate screens into seperate routes
            return (
                <div className="choice">
                    <Switch>
                        <Route path="/" exact={true} component={ChoiceMenu} />
                        <Route path="/join/" component={JoinMenu} />
                        <Route path="/create/" component={CreateMenu} />
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
                        <Redirect from="/join/" to="/" />
                        <Redirect from="/create/" to="/" />
                    </Switch>
                </div>
            );
        }
    }
}
