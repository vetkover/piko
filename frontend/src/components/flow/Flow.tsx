import { useEffect, useRef } from 'react';
import FlowRoutes from './FlowRoutes.js';
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './Flow.scss'
import React from 'react';


const Flow = () => {

  const flowSelector = useSelector((state: any) => state.flow)
  const pikoSelector = useSelector((state: any) => state.pikoset)
  const whoamiSelector = useSelector((state: any) => state.whoami)

  const dispatch = useDispatch()

  const flowContainer = useRef<any>()
  const flowHeader = useRef<any>()
  let isMovable = false;
  let offsetX = 0;
  let offsetY = 0;

  function mouseDown(event: any){
    isMovable = true;
    offsetX = event.clientX - flowContainer.current.offsetLeft;
    offsetY = event.clientY - flowContainer.current.offsetTop;
  }

  function mouseMove(event: any){
    if(isMovable){
      let cursorX = event.clientX;
      let cursorY = event.clientY;
  
      flowContainer.current.style.left = (cursorX - offsetX) + "px";
      flowContainer.current.style.top = (cursorY - offsetY) + "px";
    }
  }

  function mouseUp(){
    isMovable = false;
  }
  document.addEventListener("mouseup", mouseUp)
  document.addEventListener("mousemove", mouseMove)
    
  function getActualFlow(){
    if(flowSelector.flowURL != ""){
      return (
        <div ref={flowContainer} className="flow-container">
          <div className='flow'>
            <div ref={flowHeader} className='flow-header' onMouseDown={mouseDown}>
              <button id='close-button' onClick={(() => {
                dispatch({type:"CLEAR_FLOW"})
              })}>
                <svg  viewBox="0 0 15 15"  width="30" height="30"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="black"></path></svg>
              </button>
              <a className='flow-title'>{flowSelector.flowTitle}</a>
            </div>
            <div className="flow-body">
              {FlowRoutes.map((path, index) =>{
                const {element, route} = path
                if(route === flowSelector.flowURL){
                  return (
                    <React.Fragment key={route}>
                      {element}
                    </React.Fragment>
                  )
                } else{
                  return false
                }
              })}
            </div>
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
