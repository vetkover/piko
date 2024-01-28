import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/header/Header";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from './redux/store'
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);



root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
    <Header />
      <App />
    </Router>
    </Provider>
  </React.StrictMode>
);
