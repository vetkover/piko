import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useDispatch, useSelector } from "react-redux";
import './createPost.scss'
import imageIco from './imageIco.svg'
import soundIco from './soundIco.svg'
import videoIco from './videoIco.svg'
import xIco from './xIco.svg'
import PlayerModule from "../../components/dokoa-player/playerModule"
const svg = {
    pause: "M42,2.98v43.54c0,0.54-0.71,0.98-1.59,0.98h-7.08c-0.88,0-1.59-0.44-1.59-0.98V2.98 c0-0.54,0.71-0.98,1.59-0.98h7.08C41.29,2,42,2.44,42,2.98z M18.62,2.98v43.54c0,0.54-0.71,0.98-1.59,0.98H9.96c-0.88,0-1.59-0.44-1.59-0.98V2.98C8.37,2.44,9.08,2,9.96,2 h7.08C17.91,2,18.62,2.44,18.62,2.98z",
    play: "M8.5,2.99v43.88c0,0.66,0.74,1.05,1.29,0.68l31.73-21.87c0.47-0.33,0.47-1.03,0-1.35L9.79,2.31 C9.25, 1.93, 8.5, 2.32, 8.5, 2.99z",
}

function CreatePost() { //code refactoring urgently needed... sometime in the future :3
  const pikoSelector = useSelector((state: any) => state.pikoset)
  const whoamiSelector = useSelector((state: any) => state.whoami)

  const postText = useRef<any>()

    const [imagesData, setImagesData] = useState<any>([]);
    const [soundsData, setSoundsData] = useState<any>([]);
    const [textData, setTextData] = useState<any>("");
    const [videoData, setVideoData] = useState<any>("");

    

useEffect(() => {
    console.log(soundsData)
}, [soundsData]);

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
}, [soundsData]);

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
                {soundsData.map((value: any, index: number)=>{
                    return(
                    <div className="sound-container" key={value.src}>

                        <audio preload="metadata" ref={(object) => playerRefArray.current[index] = object} id="sound" src={value.src} onEnded={() => {replaySVG(index)}}/>

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

 function uploadSound(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;
    console.log(files)
    if (files) {
        let formData = new FormData();
        formData.append('file', files[0]);
        let xhr = new XMLHttpRequest();

        let filename = files[0].name

        xhr.upload.onprogress = function (event) {

            setProgressLayer((prevState: any[]) => {
                const index = prevState.findIndex(item => item.filename === filename);

                const updatedProgress = prevState.map(item =>
                    item.filename === filename ? { ...item, nowK: event.loaded, totalK: event.total } : item
                );
                if (event.loaded === event.total) {
                    return updatedProgress.filter(item => item.filename !== filename);
                }

                if (index !== -1) {
                  return prevState.map(item =>
                    item.filename === filename ? { ...item, nowK: event.loaded, totalK: event.total } : item
                  );
                } else {
                  return [...prevState, { filename: filename, nowK: event.loaded, totalK: event.total }];
                }
              });
        };

        xhr.open('POST', `${pikoSelector?.cdn}/temp/media`, true);
        xhr.responseType = 'json';

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                const data = xhr.response;

                if (data.status) {
                    addSound(`${pikoSelector?.cdn}/${data.tempToken}`, data.originalName);
                }
            }
        };
        
        xhr.send(formData);
    }
}

const addSound = (newSound: string, originalName: any) => {
    setSoundsData((prevState: any) => {
        if (!prevState.includes(newSound)) {
            return [
                ...prevState,
                {
                    title: originalName,
                    src: newSound
                }
            ];
        }
        return prevState;
    });
};

function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;

    if (files) {
        let formData = new FormData();
        formData.append('file', files[0]);
        let xhr = new XMLHttpRequest();

        let filename = files[0].name

        xhr.upload.onprogress = function (event) {

            setProgressLayer((prevState: any[]) => {
                const index = prevState.findIndex(item => item.filename === filename);

                const updatedProgress = prevState.map(item =>
                    item.filename === filename ? { ...item, nowK: event.loaded, totalK: event.total } : item
                );
                if (event.loaded === event.total) {
                    return updatedProgress.filter(item => item.filename !== filename);
                }

                if (index !== -1) {
                  return prevState.map(item =>
                    item.filename === filename ? { ...item, nowK: event.loaded, totalK: event.total } : item
                  );
                } else {
                  return [...prevState, { filename: filename, nowK: event.loaded, totalK: event.total }];
                }
              });
        };

        xhr.open('POST', `${pikoSelector?.cdn}/temp/media`, true);
        xhr.responseType = 'json';

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                const data = xhr.response;

                if (data.status) {
                    addImage(`${pikoSelector?.cdn}/${data.tempToken}`);
                }
            }
        };

        xhr.send(formData);
    }
}

const addImage = (newImage: string) => {
    setImagesData((prevState: any) => {
        if (!prevState.includes(newImage)) {
            return [
                ...prevState,
                newImage
            ];
        }
        return prevState;
    });
};


const removeImage = (imageToRemove: string) => {
    setImagesData((prevState: any) => (
        prevState.filter((image: string) => image !== imageToRemove)
    ));
};


    const [textLength, setTextLenght] = useState<number>(0)
    const postTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        const currentText = e.currentTarget.textContent;
      
        setTextData((prevState: any) => (
            currentText
        ));
      
        setTextLenght(currentText!.length);
      };

      function uploadVideo(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.currentTarget.files;
        console.log(files)
        if (files) {
            let formData = new FormData();
            formData.append('file', files[0]);
            let xhr = new XMLHttpRequest();
    
            let filename = files[0].name
    
            xhr.upload.onprogress = function (event) {
    
                setProgressLayer((prevState: any[]) => {
                    const index = prevState.findIndex(item => item.filename === filename);
    
                    const updatedProgress = prevState.map(item =>
                        item.filename === filename ? { ...item, nowK: event.loaded, totalK: event.total } : item
                    );
                    if (event.loaded === event.total) {
                        return updatedProgress.filter(item => item.filename !== filename);
                    }
    
                    if (index !== -1) {
                      return prevState.map(item =>
                        item.filename === filename ? { ...item, nowK: event.loaded, totalK: event.total } : item
                      );
                    } else {
                      return [...prevState, { filename: filename, nowK: event.loaded, totalK: event.total }];
                    }
                  });
            };
    
            xhr.open('POST', `${pikoSelector?.cdn}/temp/media`, true);
            xhr.responseType = 'json';
    
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    const data = xhr.response;
    
                    if (data.status) {
                        addVideo(`${pikoSelector?.cdn}/${data.tempToken}`);
                    }
                }
            };
            
            xhr.send(formData);
        }
    }

      function VideoContainer(){
        return (
            videoData !== "" ? (
              <div className="dokoaplayer-container">
                <PlayerModule link={videoData} />
              </div>
            ) : (
              <React.Fragment />
            )
          );
        }

       const addVideo = (newVideo: string) => {
        setVideoData((prevState: any) => {
                return newVideo                 
            }
       )};

  function ImageContainer(){
    useEffect(() => {
      }, [imagesData]);
      
    function imageProcessing() {
        return imagesData.map((value: any, index: number) => {
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
                                    <button id="close-button" onClick={()=> removeImage(value.src)}>
                                        <img id="close-img" src={xIco}/>
                                    </button>
                                <img style={imageData.length !== 1 ? {...ruleSet1, width: targetWidth[index]} : {...ruleSet1, height: "600px !important"}} className="mediaContent" src={value!.src}/>
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
                                <button id="close-button" onClick={()=> removeImage(value.src)}>
                                        <img id="close-img" src={xIco}/>
                                    </button>
                                <img style={{...ruleSet1, width: targetWidth[index+3]}}className="mediaContent" src={value!.src}/>
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

function createPost(){
    const createPostObj = {
        images: imagesData,
        sounds: soundsData,
        video: videoData,
        text: textData
    }
    
    fetch(`${pikoSelector.api}/api/post/create`, { 
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createPostObj)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("error:", error));

}

const [progressLayer, setProgressLayer] = useState<any>([])

function ProgressContainer(){

    return(
        <div className="upload-progress">

        {progressLayer.map((value: any, index: any) => {
            return (
                <div className="progress-container" key={value.totalK}>
                <svg className="progress" viewBox="0 0 36 36">
                    <path className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
    
                    <path className="circle" strokeDasharray={`${(value.nowK/value.totalK)*100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <a id="text">{value.filename}</a>
                </div>
            )
        })}

    </div>

    )
}

  return (
        <React.Fragment>
            <div className="body-container">
                <div className="preview-post-create">
                    <div className="left-corner">
                    <img className='userAvatar' src={`${pikoSelector.cdn}/${whoamiSelector.avatar}`}/>
                    </div>
                    
                    <div className="middle-corner">
                        <div className="about-author">
                            <div className="top">
                                <div className="author">
                                    {whoamiSelector.username}
                                </div>
                                <div className="time">
                                    {(() => {
                                        const date = new Date();
                                        let formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
                                        formattedDate = formattedDate.replace(/\//g, '.');
                                        return formattedDate;
                                    })()}
                                </div>
                            </div>
                        </div>
                        <div className="post-content-container">
                            <div className="post-text">
                                <div placeholder="placeholder" ref={postText} onInput={postTextChange} contentEditable="true" id="text">
                                </div>
                            </div>
                            <VideoContainer />
                            <ImageContainer />
                        </div>
                        <SoundContainer />
                    </div>
                    </div> 
                    <div className="edit-options-container">

                        <ProgressContainer />

                        <div className="edit-option">
                            <input onChange={uploadImage} type="file" accept=".png,.jpeg,.jpg"></input>
                            <img id="img" src={imageIco} ></img>
                        </div>

                        <div className="edit-option">
                            <input onChange={uploadVideo} type="file" accept=".mp4"></input>
                            <img id="img" src={videoIco} ></img>
                        </div>

                        <div className="edit-option">
                            <input onChange={uploadSound} type="file" accept=".mp3"></input>
                            <img id="img" src={soundIco} ></img>
                        </div>

                        <div className="edit-option">
                            <a id="range">{4000-textLength}</a>
                        </div>

                        <div className="edit-option">
                            <button onClick={createPost}>create post</button>
                        </div>

                    </div>     
                </div>
        </React.Fragment>
     )
}

export default CreatePost;
