import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { BrowserRouter } from "react-router-dom";

//Runs the react components within index.html
ReactDOM.render(
        <BrowserRouter>
        <App />
        </BrowserRouter>,
    document.getElementById("root"));