import React, { useEffect, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();

  const whoami = useSelector((state: any) => state.whoami)
  useEffect(()=>{
          if (whoami.nickname) {
            navigate(`/p/${whoami.nickname}`);
          } else {
            navigate(`/auth`);
          }
        }
  )
  return <div></div>;
}

export default Profile;
