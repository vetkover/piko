import React, { Component, useEffect } from 'react';
import AppRoutes from './AppRoutes';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";


declare global {
  var pikoSet: any;
  var api: any;
  var whoami:any;
}
global.whoami = {}
global.api = "http://localhost:3001"

const App = () => {

    useEffect(() => {
      const fetchData1 = async () => {
        fetch(`${global.api}/api/pikoset`)
          .then((response) => response.json())
          .then((data) => {
            global.pikoSet = data;
          })
          .catch((error) => console.error("error:", error));
      };

      const fetchData2 = async () => {
        if(whoami){} else {
        fetch(`${global.api}/api/whoami`)
          .then((response) => response.json())
          .then((data) => {
            global.whoami = data;
          })
  
          .catch((error) => console.error("error:", error));
      };
    }
    fetchData1();
    fetchData2();
    }, [])


    return (
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element}/>;
                })}
            </Routes>
    );
}

export default App;