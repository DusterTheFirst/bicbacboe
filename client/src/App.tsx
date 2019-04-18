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

import {ClientErrorCode} from "../../protocol/build/ws/client";
import React, { Component } from "react";
import "./App.scss";

alert(JSON.stringify(ClientErrorCode, undefined, 4));

class App extends Component {
    public render() {
        return (
            <div className="app">
                test
            </div>
        );
    }
}

export default App;
