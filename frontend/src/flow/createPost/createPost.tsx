import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useDispatch, useSelector } from "react-redux";
import './createPost.scss'
import imageIco from './imageIco.svg'
import xIco from './xIco.svg'

function CreatePost() { //code refactoring urgently needed... sometime in the future :3
  const pikoSelector = useSelector((state: any) => state.pikoset)
  const whoamiSelector = useSelector((state: any) => state.whoami)

  const postText = useRef<any>()

const [previewData, setPreviewData] = useState<any>({
    images: [],
    sounds: ["https://rr2---sn-i5heen7s.googlevideo.com/videoplayback?expire=1708912889&ei=mZzbZbrEBPSJ6dsP9Lu2iA8&ip=193.8.238.210&id=o-AENh1XYuuOniBdFFtOiHQS3CZ6xp9_LewusCfXAL7HKm&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=6D&mm=31%2C29&mn=sn-i5heen7s%2Csn-5hneknek&ms=au%2Crdu&mv=m&mvi=2&pl=24&gcr=nl&initcwndbps=380000&spc=UWF9f3UBHz1v94CfJgI7SX1rLX6WhGsb6cxDgiUqHdbYHbA&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=208.027&lmt=1707793618245805&mt=1708891012&fvip=5&fexp=24007246&c=ANDROID&txp=4538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgcni6cCWMjkxfJVA1qGpt3FfeCgu79weDnOOvYnhk06wCIE0C91MCtIa7izgAg34hb-7of_IPI-RDHGhMcZ4BRHKm&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRgIhAP1adF8NuaZ87YuhGXu3fZsW2XC3FZiKNrFIuv9P_yjlAiEAjmvcdEZl7-WyBIJuJXaILephDcVtEjg9KjmR30ACatQ%3D&title=Men%20At%20Work%20-%20Who%20Can%20It%20Be%20Now%3F%20(Video%20Version)"],
    text: ""
})

useEffect(() => {
}, [previewData]);

 function SoundContainer(){
    useEffect(() => {
    }, [previewData]);

    const testSound = useRef<any>();
    const timelineContainer = useRef<any>();
    const timelineCurrent = useRef<any>()
    const timelineBufer = useRef<any>()

    const [width, setWidth] = useState(0);
    useEffect(() => {
        if (timelineContainer.current) {
            setWidth(timelineContainer.current.offsetWidth);
        }
      }, [timelineContainer.current]);

      useEffect(() => {
        if (testSound.current) {
            testSound.current.addEventListener('timeupdate', currentTime);
        }
    
        return () => {
            if (testSound.current) {
                testSound.current.removeEventListener('timeupdate', currentTime);
            }
        };
    }, [testSound.current]);

    const timeLineBuffer = () => {
        if (testSound.current) {
            const current = testSound.current.currentTime;
            const duration = testSound.current.duration;
            const buffered = testSound.current.buffered;
    
            for (let i = 0; i < buffered.length; i++) {
                if (current >= buffered.start(i) && current <= buffered.end(i)) {
                    timelineBufer.current.style.width = (100 / (duration / buffered.end(i))) + "%";
                }
            }
        }
    };
    
    const currentTime = () => {
        if (testSound.current) {
            const now = testSound.current.currentTime;
            const duration = testSound.current.duration;
    
            timeLineBuffer();
            timelineCurrent.current.style.width = (now / duration) * 100 + '%';
        }
    };

    const removeSound = (soundToRemove: string) => {
        setPreviewData((prevState: {sounds:any;}) => ({
          ...prevState,
          sounds: prevState.sounds.filter((sound: string) => sound !== soundToRemove)
        }));
      };
    
      const addSound = (newSound: string) => {
        setPreviewData((prevState: { sounds: any; }) => {
            if (!prevState.sounds.includes(newSound)) {
                return {
                    ...prevState,
                    images: [...prevState.sounds, newSound],
                };
            }
            return prevState;
        });
    };

    const play = ()=> {
        if(!testSound.current.paused){
            testSound.current.pause()
        } else {
            testSound.current.play()
        }
    }

    const changeTime = (event :React.MouseEvent) => {
        const rect = timelineContainer.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const duration = testSound?.current.duration;
        console.log(((x/width)*100)/100 * duration)
        testSound.current.currentTime  = ((x/width)*100)/100 * duration
      };
    

    return (
        <React.Fragment>
            <div className="sound-container-body">
                {previewData.sounds.map((value: string)=>{
                    return(
                    <div className="sound-container" key={value}>

                        <audio preload="metadata" ref={testSound} id="sound" src={value}/>

                        <div className="left-control">
                            
                            <div className="play-control"> 
                                <button onClick={play} id="play-button"/>
                             </div>
                        </div>

                        <div className="middle-control"> 
                            <div onClick={changeTime} ref={timelineContainer} className="timeline-container">
                                    <div className="timeline-background" />
                                    <div ref={timelineBufer} className="timeline-bufer" />
                                    <div ref={timelineCurrent} className="timeline-curent" />
                                    
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
            console.log(value)
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
