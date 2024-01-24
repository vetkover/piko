import React, { useEffect, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate } from "react-router";

function Profile() {
  const navigate = useNavigate();
  let userData: any;

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${global.api}/api/user/whoami` , { credentials: 'include'})
        .then((response) => response.json())
        .then((data) =>{ 
          userData = data
          console.log( userData);
          if (userData && userData.nickname) {
            navigate(`/p/${userData.nickname}`);
          } else {
            navigate(`/auth`);
          }
        })
          
        .catch((error) => console.error("error:", error));
      
    };
    fetchData();
  }, []);



  return <div></div>;
}

export default Profile;
