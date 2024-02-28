import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useDispatch, useSelector } from "react-redux";
import './createPost.scss'
import imageIco from './imageIco.svg'
import xIco from './xIco.svg'

const svg = {
    pause: "M42,2.98v43.54c0,0.54-0.71,0.98-1.59,0.98h-7.08c-0.88,0-1.59-0.44-1.59-0.98V2.98 c0-0.54,0.71-0.98,1.59-0.98h7.08C41.29,2,42,2.44,42,2.98z M18.62,2.98v43.54c0,0.54-0.71,0.98-1.59,0.98H9.96c-0.88,0-1.59-0.44-1.59-0.98V2.98C8.37,2.44,9.08,2,9.96,2 h7.08C17.91,2,18.62,2.44,18.62,2.98z",
    play: "M8.5,2.99v43.88c0,0.66,0.74,1.05,1.29,0.68l31.73-21.87c0.47-0.33,0.47-1.03,0-1.35L9.79,2.31 C9.25, 1.93, 8.5, 2.32, 8.5, 2.99z",
}

function CreatePost() { //code refactoring urgently needed... sometime in the future :3
  const pikoSelector = useSelector((state: any) => state.pikoset)
  const whoamiSelector = useSelector((state: any) => state.whoami)

  const postText = useRef<any>()

const [previewData, setPreviewData] = useState<any>({
    images: [],
    sounds: [{ 
        title: "неизвестно - без имени",
        src: "https://rr5---sn-ab5l6ndy.googlevideo.com/videoplayback?expire=1709133937&ei=EfzeZc2fM6KA_9EP-sieuAE&ip=93.120.113.225&id=o-AHltoffr-deyNJzOoaSyDtNO-nnlGCVXm5tqy3brtb6s&itag=22&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=BW&mm=31%2C29&mn=sn-ab5l6ndy%2Csn-ab5sznzs&ms=au%2Crdu&mv=m&mvi=5&pl=21&initcwndbps=278750&spc=UWF9f56tnDmF3vw6VxPmmaJngyfP-zntuqzr60Z3Imy4jY4&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=369.266&lmt=1705714710078620&mt=1709111820&fvip=3&fexp=24007246&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhAJNnTsMjRDP0zq9gTcGwqd0EaI1NsaK3Rmnoq45nP1C7AiBZpEvM72mNKm8eIWFA5zAQF58j0rn64oDfgEImUFhjaQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRAIgD1QjB110xyV9yvMh_rg6UJLaNW-TVr5Q1fFWI6ImbZQCIG5lF2iJhrzqC2UFmX89Kr0WfmtCL-FQ7ufjfINolklh&title=Kikuo%20-%20%E3%81%82%E3%81%AA%E3%81%90%E3%82%89%E3%81%90%E3%82%89%E3%81%97"
    },
    { 
        title: "old doll",
        src: "https://rr2---sn-5hnekn7z.googlevideo.com/videoplayback?expire=1709138974&ei=vg_fZenIJc-N6dsP9pCzsAE&ip=193.32.8.31&id=o-AE-mKwf5PUEtfbLifHI2DNPBr-rjav2guXvz9NPvoNSo&itag=22&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=yx&mm=31%2C26&mn=sn-5hnekn7z%2Csn-i5heen7d&ms=au%2Conr&mv=m&mvi=2&pl=24&gcr=nl&initcwndbps=383750&spc=UWF9fxqOFXcbra7bhwPFef2FtoeTOmlolnYcLKMJ0EcbxeI&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=99.520&lmt=1706467355504479&mt=1709117100&fvip=4&fexp=24007246&c=ANDROID&txp=2318224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgaCAQE58xlB1snzYCSF2pA9PqfeVs3NBAJHAFf_OBcVsCIQDSj1tmIx4KdmSCTOWnrJmet4ydzq7X_OMVrz8iK_weEg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgPr54YmCB86ZuaEvxtf2BKK3iZidnqMlDn8vyc6vGjRECIQCXJEK0WrhVaYvIW82swUhZ2vd-2dDkSaeUNOww-_QsvA%3D%3D&title=Old%20Doll"
    }

],
    text: ""
})

useEffect(() => {
}, [previewData]);

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
}, [previewData.sounds]);

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
        const rect = timelineContainer.current[index]?.getBoundingClientRect();
        const x = event.nativeEvent.clientX - rect?.left;
        if (typeof x === 'number' && typeof width === 'number' && playerRefArray.current[index]) {
          const duration = playerRefArray.current[index]!.duration;
          const newTime = (x / width) * duration;
          playerRefArray.current[index]!.currentTime = newTime;
        }
      };
      
    

    return (
        <React.Fragment>
            <div className="sound-container-body">
                {previewData.sounds.map((value: any, index: number)=>{
                    return(
                    <div className="sound-container" key={value.src}>

                        <audio preload="metadata" ref={(object) => playerRefArray.current[index] = object} id="sound" src={value.src}/>

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

function uploadMedia(event: React.ChangeEvent<HTMLInputElement>) {
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
    setPreviewData((prevState: { images: any; }) => {
        if (!prevState.images.includes(newImage)) {
            return {
                ...prevState,
                images: [...prevState.images, newImage],
            };
        }
        return prevState;
    });
};

  const removeImage = (imageToRemove: string) => {
    setPreviewData((prevState: {images:any;}) => ({
      ...prevState,
      images: prevState.images.filter((image: string) => image !== imageToRemove)
    }));
  };

    const [textLength, setTextLenght] = useState<number>(0)
    const postTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        const currentText = e.currentTarget.textContent;
      
        setPreviewData((prevState: any) => ({
          ...prevState,
          text: currentText
        }));
      
        setTextLenght(currentText!.length);
      };

  function MediaContainer(){
    useEffect(() => {
      }, [previewData]);
      
    function imageProcessing() {
        return previewData.images.map((value: any, index: number) => {
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
        images: previewData.images,
        sounds: previewData.sounds,
        text: previewData.text
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
                            <MediaContainer />
                        </div>
                        <SoundContainer />
                    </div>
                    </div> 
                    <div className="edit-options-container">

                        <ProgressContainer />

                        <div className="edit-option">
                            <input onChange={uploadMedia} type="file" accept=".png,.jpeg,.jpg"></input>
                            <img id="img" src={imageIco} ></img>
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
