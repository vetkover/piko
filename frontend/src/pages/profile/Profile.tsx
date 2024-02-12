import React, { useEffect, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();

  const whoami = useSelector((state: any) => state.whoami)
  
  useEffect(()=>{
    console.log(whoami)
    if (whoami.username) {
      navigate(`/p/${whoami.username}`);
    } else if (whoami.stateWasUpdated) {
      navigate(`/auth`);
    }
  }, [whoami])
  
  return <div></div>;
}

export default Profile;
