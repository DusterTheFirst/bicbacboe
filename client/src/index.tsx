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

import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import welcome from "./welcome.json";

ReactDOM.render(<App />, document.getElementById("root"));

const textoutlinecss = "text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;";

// Spread and format the given text
console.log(welcome.map(x => `%c${x.text}`).join("\n"), ...welcome.map(x => `${x.style}; ${textoutlinecss}`));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
