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

import { IAccount, login } from "@bicbacboe/api";
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import Notifications, { notify } from "react-notify-toast";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import { ErrorMessages } from "./errors";
import { Lobby } from "./views/LobbyView";
import MainMenuView from "./views/MainMenuView";
import PageNotFoundView from "./views/PageNotFoundView";

type StateContext<T> = [T, Dispatch<SetStateAction<T>>];

export const AccountContext = createContext<StateContext<IAccount | undefined>>([undefined, () => void 0]);

export default function App() {
    let [account, setAccount] = useState<IAccount>();

    useEffect(() => {
        login().then(setAccount).catch(() => notify.show(ErrorMessages.CannotConnectToServer.short, "error", 10000));
    }, []);

    return (
        <div className="app">
            <AccountContext.Provider value={[account, setAccount]}>
                <Notifications />
                {account === undefined ? <Login /> : <LoggedIn />}
                <div className="buildinfo">
                    {JSON.stringify(process.env, undefined, 4)}
                    <a href={process.env.REACT_APP_TRAVIS_BUILD_WEB_URL}><h1>Build Info</h1></a>
                    <h2>Version</h2>
                    {process.env.REACT_APP_TRAVIS_BRANCH}-{process.env.REACT_APP_TRAVIS_COMMIT}
                    <br/>
                    <a href={`https://github.com/DusterTheFirst/bicbacboe/commit/${process.env.REACT_APP_TRAVIS_COMMIT}`}>Changes</a>
                    <a href={`https://github.com/DusterTheFirst/bicbacboe/tree/${process.env.REACT_APP_TRAVIS_COMMIT}`}>Browse repository</a>
                    <h3>Node Version</h3>
                    {process.env.REACT_APP_TRAVIS_NODE_VERSION}
                </div>
            </AccountContext.Provider>
        </div>
    );
}

function Login() {
    return (
        <div className="login">
            Logging in
        </div>
    );
}

function LoggedIn() {
    return (
        <Switch>
            <Route path="/lobby/:lobbyID" component={Lobby} />
            <Route path={["/", "/join", "/create"]} exact={true} component={MainMenuView} />
            <Route component={PageNotFoundView} />
        </Switch>
    );
}
