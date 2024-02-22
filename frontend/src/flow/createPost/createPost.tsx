import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useDispatch, useSelector } from "react-redux";
import './createPost.scss'
import imageIco from './imageIco.svg'

function CreatePost() { //code refactoring urgently needed... sometime in the future :3
  const pikoSelector = useSelector((state: any) => state.pikoset)
  const whoamiSelector = useSelector((state: any) => state.whoami)

  const postText = useRef<any>()

const [previewData, setPreviewData] = useState<any>({
    images: []
})

useEffect(() => {
}, [previewData]);

function uploadMedia(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;

    if (files) {
        let formData = new FormData();
        formData.append('file', files[0]);
        let xhr = new XMLHttpRequest();

        xhr.upload.onprogress = function (event) {
            console.log(event.loaded);
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
  const postTextChange = (e: React.FormEvent<HTMLInputElement>) =>{
    setTextLenght(e.currentTarget.textContent!.length)
  }

  function MediaContainer(){
    useEffect(() => {
        console.log("MediaContainer updated with new previewData", previewData);
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
                            console.log(targetWidth[index+3])
                            return (
                                <React.Fragment key={value!.src}>
                                <div className="media">
                                <img  style={{...ruleSet1, width: targetWidth[index+3]}}className="mediaContent" src={value!.src}/>
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

function createpost(){

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
                    </div>
                    </div> 
                    <div className="edit-options-container">

                        <div className="edit-option">
                            <input onChange={uploadMedia} type="file" accept=".png,.jpeg,.jpg"></input>
                            <img id="img" src={imageIco} ></img>
                        </div>

                        <div className="edit-option">
                            <a id="range">{4000-textLength}</a>
                        </div>

                        <div className="edit-option">
                            <button>create post</button>
                        </div>

                    </div>     
                </div>
        </React.Fragment>
     )
}

export default CreatePost;
