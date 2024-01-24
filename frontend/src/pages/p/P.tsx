import React, { useEffect, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate, useParams } from "react-router";
import "./P.scss";

function P() {

  const navigate = useNavigate();
  const { username } = useParams();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if(userData){} else {
      fetch(`${global.api}/api/p/${username}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })

        .catch((error) => console.error("error:", error));
    };
  }
  fetchData();
  }, [userData])
  return (
    <div className="profile-container">

      <div className="profile">

        <div className="about-user">

            <img className="avatar" src={`${global.pikoSet?.cdn}/${userData?.avatar}`} />

          <img className="baner" src={`${global.pikoSet?.cdn}/${userData?.baner}`} />
          <div className="creditial">
            <a id="nickname">{userData?.nickname}</a>
            <a id="username">{userData?.username}</a>
          </div>
          <div className="bio">{userData?.bio}</div>

        </div>
      </div>
    </div>
  );
}

export default P;
