import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pixelether from "./contracts/Pixelether.json";
// let drizzle know what contracts we want
const options = { contracts: [Pixelether] };
// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);
ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));