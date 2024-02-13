import { useEffect } from 'react';
import FlowRoutes from './FlowRoutes.js';
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './Flow.scss'
import React from 'react';

const Flow = () => {

  const flowSelector = useSelector((state: any) => state.flow)
  const pikoSelector = useSelector((state: any) => state.pikoset)
  const whoamiSelector = useSelector((state: any) => state.whoami)

  function getActualFlow(){

    if(flowSelector.flowURL != ""){
    return (
      <div className="flow-container">
  
        <div className="flow-body">
      
          {FlowRoutes.map((path, index) =>{
            const {element, route} = path
            return (
              <React.Fragment key={route}>
                {element}
              </React.Fragment>
              )
          })}
          
          </div>
        </div>
    )
    }
    return true
  }


    return (
            <div>
              {getActualFlow()}
            </div>
    );
}

export default Flow;