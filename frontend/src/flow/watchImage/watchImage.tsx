import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import './watchImage.scss'

function WatchImage() {
  const flowSelector = useSelector((state: any) => state.flow)
  return(
    <div id="body-container">
      <img src={flowSelector.flowContent.src} />
    </div>
  )
}

export default WatchImage;
