import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import './watchImage.scss'

function WatchImage() {
  const flowSelector = useSelector((state: any) => state.flow)
  return(
    <div className="flow-body-container" id="body-container">
      <img src={flowSelector.flowContent[flowSelector.activeTab]?.src} />
    </div>
  )
}

export default WatchImage;
