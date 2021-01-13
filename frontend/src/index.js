import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { BrowserRouter } from "react-router-dom";

//Tells the app to render inside the root div that was setup in index.html
ReactDOM.render(
        <BrowserRouter>
        <App />
        </BrowserRouter>,
    document.getElementById("root"));