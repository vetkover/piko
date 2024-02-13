import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/header/Header";
import Flow from "./components/flow/Flow";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from './redux/store'
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);



root.render(
  <React.StrictMode>
    <Provider store={store}>

    <Flow />
      <Router>
        <Header />
        <App />
      </Router>
    </Provider>

  </React.StrictMode>
);
