import React, { useEffect, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate, useParams } from "react-router";
import "./P.scss";
import { useSelector } from "react-redux";
import temmi from './Temmi.png';
import baner404 from './404baner.png';
import avatar404 from './404avatar.png';

function ProfileNotExistContainer(userData: any){
  const {username} = useParams()
  return (
    <div className="profile-container">
  
    <div className="profile">

      <div className="about-user">

          <img className="avatar" src={avatar404} />

        <img className="baner" src={baner404} />
        <div className="creditial">

          <div className="user-not-found">

          {`@${username} ${getText("p.userNotFound")}`}
          </div>

        </div>
        <div className="bio"></div>

      </div>
    </div>
  </div>
  )
}

function ProfilePosts(){

  return (
    <React.Fragment>
      <div className="posts-container">
        <div className="posts">

          <div className="post-header">
                  <a>posts: 0</a>
          </div>

          <div className="posts-content">
          
          <div className="post">
          <div className="left-line">
            <img className="avatar" src={avatar404}/>
            </div>

            <div className="middle-line">
              <div className="author-line">
            <div className="username"> username </div>  
            <div className="username"> 17.24.2024 </div>  
            </div>

            <div className="post-data"> 

              <div className="post-text">
                asdwwqeqweqwe asd asd asgy hjpqwiuid qw d qwo iuiyugjhbkjl g vb nj uy gfv bnjk iu yg  nm lo iuy tg fd k jh gt y ui ol kjhgfdertyu jko
              </div>
              
              <div className="post-images">
                <img src={avatar404}/> 
                <img src={avatar404}/> 

              </div>

            </div>
            </div>
            </div>

            
          </div>
          
        </div>
        </div>
    </React.Fragment>
  )
}

function P() {

  const pikoSelector = useSelector((state: any) => state.pikoset)
  //const whoamiSelector = useSelector((state: any) => state.whoami)

  //const navigate = useNavigate();
  const { username } = useParams();
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      if(userData){} else {
      fetch(`${pikoSelector.api}/api/p/${username}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.error("error:", error));
    };
    
  }
  fetchData();
  }, [userData])

  function ProfileContainer(){


    return (
      <div className="profile-container">
  
        <div className="profile">
  
          <div className="about-user">
  
              <img className="avatar" src={`${pikoSelector?.cdn}/${userData?.avatar}`} />
  
            <img className="baner" src={`${pikoSelector?.cdn}/${userData?.baner}`} />
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

  function renderPage(){
    switch(userData?.status){

      case "ok":
        return ( 
          <React.Fragment>
              <ProfileContainer />
              <ProfilePosts />
           </React.Fragment>
  )
        break;

      case "notExist":
        return ( 
                <ProfileNotExistContainer userData={userData}/> 
        )
                 
        break;

      default:
        return null;
    }
  }

  return (

    <React.Fragment>
    {renderPage()}
    </React.Fragment>

  );
}


export default P;
