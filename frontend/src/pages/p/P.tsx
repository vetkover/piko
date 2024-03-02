import React, { useEffect, useRef, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate, useParams } from "react-router";
import "./P.scss";
import { useDispatch, useSelector } from "react-redux";

import PlayerModule from "../../components/dokoa-player/playerModule"

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
  
    const [userPosts, setUserPosts] = useState<any>()
    console.log(userPosts)
  
    useEffect(() => {
      const fetchData = () => {
  
        fetch(`${pikoSelector.api}/api/post/posts/${username}`)
          .then((response) => response.json())
          .then((data) => {
            setUserPosts(data);
          })
          .catch((error) => console.error("error:", error));
      ;
      
    }
    fetchData();
    }, [userData])
    const svg = {
      pause: "M42,2.98v43.54c0,0.54-0.71,0.98-1.59,0.98h-7.08c-0.88,0-1.59-0.44-1.59-0.98V2.98 c0-0.54,0.71-0.98,1.59-0.98h7.08C41.29,2,42,2.44,42,2.98z M18.62,2.98v43.54c0,0.54-0.71,0.98-1.59,0.98H9.96c-0.88,0-1.59-0.44-1.59-0.98V2.98C8.37,2.44,9.08,2,9.96,2 h7.08C17.91,2,18.62,2.44,18.62,2.98z",
      play: "M8.5,2.99v43.88c0,0.66,0.74,1.05,1.29,0.68l31.73-21.87c0.47-0.33,0.47-1.03,0-1.35L9.79,2.31 C9.25, 1.93, 8.5, 2.32, 8.5, 2.99z",
  }
    function postsArray() {
  
      if(userPosts?.posts){
        console.log(userPosts)
  
      const posts = userPosts?.posts.map((obj: any) => {

        function SoundContainer(){

          const playerRefArray = useRef<(HTMLAudioElement | null)[]>([]);
      
          const timelineContainer = useRef<any>([]);
          const timelineCurrent = useRef<any>([])
          const timelineBufer = useRef<any>([])
          const playSVG = useRef<any>([])
      
          const [width, setWidth] = useState([0]);
          const [duration, setDuration] = useState(["0:00"]);
      
          useEffect(() => {
              for(let index = 0; index < playerRefArray.current.length; index++){
                  if (playerRefArray.current[index]) {
                      playerRefArray.current[index]!.addEventListener('loadedmetadata', () => currentTime(index));
                  }
          }
      }, []);
      
      useEffect(() => {
          for (let index = 0; index < playerRefArray.current.length; index++) {
            if (timelineContainer.current[index]) {
              setWidth(timelineContainer.current[index].offsetWidth);
            }
          }
        }, [timelineContainer]);
      
        useEffect(() => {
          for (let index = 0; index < playerRefArray.current.length; index++) {
            if (playerRefArray.current[index]) {
              playerRefArray.current[index]!.addEventListener('timeupdate', () => currentTime(index));
            }
          }
          
        
          return () => {
            for (let index = 0; index < playerRefArray.current.length; index++) {
              if (playerRefArray.current[index]) {
                playerRefArray.current[index]!.removeEventListener('timeupdate', () => currentTime(index));
              }
            }
          };
        }, [playerRefArray]);
        
      
          const timeLineBuffer = () => {
                      for(let index = 0; index < playerRefArray.current.length; index++){
              if (playerRefArray.current[index]) {
                  const current = playerRefArray.current[index]!.currentTime;
                  const duration = playerRefArray.current[index]!.duration;
                  const buffered = playerRefArray.current[index]!.buffered;
          
                  for (let i = 0; i < buffered.length; i++) {
                      if (current >= buffered.start(i) && current <= buffered.end(i)) {
                          timelineBufer.current[index].style.width = (100 / (duration / buffered.end(i))) + "%";
                      }
                  }
              }
          }
          };
          
          const currentTime = (index: number) => {
              if (playerRefArray.current[index]) {
                  const now = playerRefArray.current[index]!.currentTime;
                  const duration = playerRefArray.current[index]!.duration;
                  timeLineBuffer();
                  timelineCurrent.current[index].style.width = (now / duration) * 100 + '%';
      
                      const minutes = Math.floor((duration - now) / 60);
                      const seconds = Math.floor((duration - now) % 60);
                      
                      setDuration((prevDuration) => {
                          const updatedDuration = [...prevDuration];
                          updatedDuration[index] = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
                          return updatedDuration;
                        });
              }
          };
      
          const replaySVG = (index: number) => {
              playSVG.current[index]?.setAttribute("d", svg.play)
          }
      
          const play = (index: number)=> {
              if(!playerRefArray.current[index]!.paused){
                  playSVG.current[index]?.setAttribute("d", svg.play)
                  playerRefArray.current[index]!.pause()
              } else {
                  playerRefArray.current[index]!.play()
                  playSVG.current[index]?.setAttribute("d", svg.pause)
              }
          }
      
      
          const changeTime = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
              const offsetX = event.nativeEvent.offsetX;
              const width = timelineContainer.current[index]?.clientWidth;
          
              if (typeof offsetX === 'number' && typeof width === 'number' && playerRefArray.current[index]) {
                const duration = playerRefArray.current[index]!.duration;
                const newTime = (offsetX / width) * duration;
                playerRefArray.current[index]!.currentTime = newTime;
              }
          };
          
          return (
              <React.Fragment>
                  <div className="sound-container-body">
                      {obj.sounds.map((value: any, index: number)=>{
                          return(
                          <div className="sound-container" key={value.src}>
      
                              <audio preload="metadata" ref={(object) => playerRefArray.current[index] = object} id="sound" src={`${pikoSelector?.cdn}/${value!.src}`} onEnded={() => {replaySVG(index)}}/>
      
                              <div className="left-control">
                                  
                                  <div className="play-control"> 
                                      <button onClick={() => play(index)} id="play-button"/>
                                      <svg id="svg-button" viewBox="0 0 50 50">
                                          <path ref={(object) => playSVG.current[index] = object} id="play-svg" d="M8.5,2.99v43.88c0,0.66,0.74,1.05,1.29,0.68l31.73-21.87c0.47-0.33,0.47-1.03,0-1.35L9.79,2.31 C9.25, 1.93, 8.5, 2.32, 8.5, 2.99z" />
                                      </svg>
                                   </div>
                                  <div className="duration"> {duration[index]} </div>
                              </div>
      
                              <div className="middle-control">
                                  <div className="soundName"> {value.title} </div> 
                                  <div onClick={(event) => changeTime(event, index)} ref={(object) => timelineContainer.current[index] = object} className="timeline-container">
                                          <div className="timeline-background" />
                                          <div ref={(object) => timelineBufer.current[index] = object} className="timeline-bufer" />
                                          <div ref={(object) => timelineCurrent.current[index] = object} className="timeline-curent" />
                                  </div> 
                              </div>
                          </div>
                          )
                      })}
                  </div>
              </React.Fragment>
          )
       }
      
       function VideoContainer() {
        if (!obj.video) {
          return <React.Fragment />;
        }
      
        return (
          <React.Fragment key={obj.video}>
            <div className="dokoaplayer-container">
              <PlayerModule link={`${pikoSelector.cdn}/${obj.video}`} />
            </div>
          </React.Fragment>
        );
      }
      

        function ImageContainer(){
          useEffect(() => {
            }, []);
            
          function imageProcessing() {
              return obj.images.map((value: any, index: number) => {
                  const img = new Image();
                  img.src = value;
          
                  img.onload = () => {
                  }
                      return {
                          src: value,
                          width: img.width,
                          height: img.height
                      }
                  
              }).filter(Boolean);
          }
          
          function RowCalc() {
      
              const ruleSet1 = {
                  maxWidth: 430
              }
          
              const ruleSet2 = {
                  maxWidth: 430
              }
          
              const imageData = imageProcessing();
              switch(imageData.length) {
                  case 1:
                      ruleSet1.maxWidth = 420;
                      break;
                  case 2:
                      ruleSet1.maxWidth = 400;
                      break;
                  case 3:
                      ruleSet1.maxWidth = 284;
                      break;
                  case 4:
                      ruleSet1.maxWidth = 284;
                      ruleSet2.maxWidth = 420;
                      break;
                  case 5:
                      ruleSet1.maxWidth = 284;
                      ruleSet2.maxWidth = 400;
                      break;
                  case 6:
                      ruleSet1.maxWidth = 284;
                      ruleSet2.maxWidth = 284;
                      break;
              }
      
              function calculateWidth(originalWidth: number, originalHeight: number, targetHeight: number) {
                  let ratio = originalWidth / originalHeight;
                  return targetHeight * ratio;
              }
      
              const targetWidth = imageData.map((value: any, index: number)=>{
              
              if(imageData.length == 1){
                  return 600
              }
                  return calculateWidth(value!.width, value!.height, 350)
              })
      
              return (
                  <React.Fragment >
                      {imageData.length > 0 &&(
                          <div className="row-1">
                              {imageData.slice(0,3).map((value: any, index: number)=>{
                                  return (
                                      <React.Fragment key={value!.src}>
                                      <div className="media">
                                      <img style={imageData.length !== 1 ? {...ruleSet1, width: targetWidth[index]} : {...ruleSet1, height: "600px !important"}} className="mediaContent" src={`${pikoSelector?.cdn}/${value!.src}`}/>
                                  </div>
                                  </React.Fragment>
                                  )
                              })}
                          </div>
                      )}
                          {imageData.length >= 3 && imageData.length <= 6 && (
                          <div className="row-2">
                              {imageData.slice(3,6).map((value: any, index: number)=>{
                                  return (
                                      <React.Fragment key={value!.src}>
                                      <div className="media">
                                      <img style={{...ruleSet1, width: targetWidth[index+3]}}className="mediaContent" src={`${pikoSelector?.cdn}/${value!.src}`}/>
                                  </div>
                                  </React.Fragment>
                                  )
                              })}
                          </div>
                      )}
      
                  </React.Fragment>
              )
          }
            
            return(
              <React.Fragment>
                <div className="media-container-body">
                  <div  className="media-container">
                      <RowCalc />
                  </div>
      
                </div>
              </React.Fragment>
            )
          }

        return (
              <React.Fragment>
                  <div className="body-container">
                      <div className="post-view">
                          <div className="left-corner">
                          <img className='userAvatar' src={`${pikoSelector.cdn}/${userData.avatar}`}/>
                          </div>
                          
                          <div className="middle-corner">
                              <div className="about-author">
                                  <div className="top">
                                      <div className="author">
                                          {userPosts.owner}
                                      </div>
                                      <div className="time">
                                          {(() => {
                                            console.log(userPosts.owner)
                                              const date = new Date(obj.date);
                                              let formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
                                              formattedDate = formattedDate.replace(/\//g, '.');
                                              return formattedDate;
                                          })()}
                                      </div>
                                  </div>
                              </div>
                              <div className="post-content-container">
                                  <div className="post-text">
                                      <div id="text">
                                        {obj.text}
                                      </div>
                                  </div>
                                  <VideoContainer />
                                  <ImageContainer />
                              </div>
                              <SoundContainer />
                          </div>
                          </div>    
                      </div>
              </React.Fragment>
           )
      })
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
                      <button id="edit-profile-flow" onClick={
                        (
                          () => {
                            const flowURL = "editProfile"; 
                            const flowTitle = getText("p.editProfile"); 
                            dispatch({type:"CREATE_FLOW", payload: {flowURL,flowTitle}})
                          }
                        )
                      }>
                        <a className="text">{getText("p.editProfile")}</a>
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
            <div className="bio">{(userData?.bio != "" || itsOwnerPage === false)? userData?.bio : getText("flow/editProfile.createBio")}</div>
  
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
