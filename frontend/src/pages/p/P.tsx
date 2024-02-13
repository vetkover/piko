import React, { useEffect, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate, useParams } from "react-router";
import "./P.scss";
import { useDispatch, useSelector } from "react-redux";

import baner404 from './404baner.png';
import avatar404 from './404avatar.png';

function ProfileNotExistContainer(){
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



function P() {
  const pikoSelector = useSelector((state: any) => state.pikoset)
  const whoamiSelector = useSelector((state: any) => state.whoami)
  const { username } = useParams();
  const [itsOwnerPage, setItsOwnerPage] = useState<any>(null)

  //const navigate = useNavigate();
  
  const [userData, setUserData] = useState<any>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      if(userData){} else {
      fetch(`${pikoSelector.api}/api/p/${username}`)
        .then((response) => response.json())
        .then(async (data) => {
          setUserData(data);
        })
        .catch((error) => console.error("error:", error));
    };
    
  }
  fetchData();
  setItsOwnerPage(whoamiSelector?.username == username ?  true : false)
  }, [userData, username])

  function ProfilePosts(){

    const {username} = useParams()
    const pikoSelector = useSelector((state: any) => state.pikoset)
  
    const [userPosts, setUserPosts] = useState<any>(null)
  
    useEffect(() => {
      const fetchData = async () => {
  
        fetch(`${pikoSelector.api}/api/post/posts/${username}`)
          .then((response) => response.json())
          .then((data) => {
            setUserPosts(data);
          })
          .catch((error) => console.error("error:", error));
      ;
      
    }
    fetchData();
    }, [])
  
    function postsArray() {
  
      if(userPosts?.posts){
  
      const posts = userPosts?.posts.map((obj: any) => (
        <div className="post" key={obj.id}>
          <div className="left-line">
            <img className="avatar" src={avatar404} />
          </div>
    
          <div className="middle-line">
            <div className="author-line">
              <div className="username">{obj.author}</div>
              <div className="username">{obj.date}</div>
            </div>
    
            <div className="post-data">
              <div className="post-text">{obj.text}</div>
    
              <div className="post-images">
                {obj.images &&
                  obj.images.map((image: string, index: number) => (
                    <img key={index} src={image} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))
      return posts;
      } else {
        return (
          <div className="post-is-empty">
            {getText("p.postsIsEmpty")}
          </div>
        )
      }
  
    }
  
    return (
      <React.Fragment>
        <div className="posts-container">
          <div className="posts">
            <div className="post-header">
                <a>{getText("p.posts")}</a> { (userPosts?.count)? userPosts?.count: 0}
            </div>
  
            {(
              () => {
                if(itsOwnerPage){
                  return (
                    <div className="post-create">
                    </div>
                  )
                } 
              }
            )()}
  
            <div className="posts-content">
            {postsArray()}
            </div>
          </div>
          </div>
      </React.Fragment>
    )
  }

  function ProfileContainer(){
    return (
      <div className="profile-container">
  
        <div className="profile">
  
          <div className="about-user">
  
          {(
              () => {
                if(itsOwnerPage){
                  return (
                    <div className="edit-profile">
                      <button onClick={
                        (
                          () => {
                            const flowURL = "editProfile"; 
                            const flowTitle = getText("p.editProfile"); 
                            dispatch({type:"CREATE_FLOW", payload: {flowURL,flowTitle}})
                          }
                        )
                      }>
                        <a>{getText("p.editProfile")}</a>
                      </button>
                    </div>
                  )
                } 
              }
            )()}

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
              <ProfilePosts/>
           </React.Fragment>
  )

      case "notExist":
        return ( 
          <ProfileNotExistContainer/> 
        )

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
