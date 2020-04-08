import * as React from "react";
import * as ReactDOM from "react-dom";
import './style/style.css';
import './style/tailwind.css';
import { App } from "./App";

import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById("root");

ReactDOM.render(<App />, rootEl);

serviceWorker.register();