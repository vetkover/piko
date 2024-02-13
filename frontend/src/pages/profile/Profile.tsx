import React, { useEffect, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const whoami = useSelector((state: any) => state.whoami)
  const pikoSelector = useSelector((state: any)=> state.pikoset)
  useEffect(()=>{

    (() => {
      fetch(`${pikoSelector.api}/api/user/whoami`, { credentials: 'include'})
        .then((response) => response.json())
        .then((data) => {
          dispatch({type: "WHOAMI", payload: data})
          if (data.username) {
            navigate(`/p/${data.username}`);
          } else {
            navigate(`/auth`);
          }
        })
        
        .catch((error) => console.error("error:", error));
  })()


  }, [whoami])
  
  return <div></div>;
}

export default Profile;
