import React, { useEffect, useRef, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import './editProfile.scss'
import uploadIco from './uploadIco.svg' 

function EditProfile() {
  const pikoSelector = useSelector((state: any) => state.pikoset)
  const whoamiSelector = useSelector((state: any) => state.whoami)

  const avatarProgressBar = useRef<any>()
  const avatarUploadIco = useRef<any>()
  const avatarHoverMenu = useRef<any>()
  const avatarHoverText = useRef<any>()

  const banerProgressBar = useRef<any>()
  const banerUploadIco = useRef<any>()
  const banerHoverMenu = useRef<any>()
  const banerHoverText = useRef<any>()

  const [newProfileObject, setNewProfileObject] = useState({
    avatar: null,
    baner: null,
    bio: null
  });

  const uploadBaner = (file: any) => {

    const fileSize = file.size;

    const fileRule = () => {
      const fileNameSplit = (file.name).split(".")
      const extension = fileNameSplit.pop();
      console.log(extension)
      return ((extension == "png" || extension == "jpg") && fileSize <= 15 * 1024 * 1024) ? true : false;
    }

    if(fileRule()){
     
      let formData = new FormData();
      formData.append('file', file);
      let xhr = new XMLHttpRequest(); 

      xhr.upload.onprogress = function(event) {
        banerHoverMenu.current.style.opacity = 1;
        const uploadPercent = (event.loaded/event.total)*100
        banerProgressBar.current.style.width = (uploadPercent < 100)? uploadPercent + '%' : "0%" ;
      };

      xhr.open('POST', `${pikoSelector?.cdn}/temp/baner`, true);
      xhr.responseType = 'json';

      xhr.onload = function(){
        var data = xhr.response;
        console.log(data.status)
        if(data.status){
          banerHoverMenu.current.style.opacity = 0;
          setNewProfileObject((prevProfileObject) => ({
            ...prevProfileObject,
            baner: data.tempToken
          }));
          console.log(newProfileObject)
          banerUploadIco.current.src = `${pikoSelector?.cdn}/${data.tempToken}`
        } else {

        }
      }

      xhr.send(formData);

    } else {
      console.warn('unsupported file extension')
    }
  }

  const banerHoverFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      uploadBaner(file);
    }
  };
  
  
  const banerDrop = (event: React.DragEvent) =>{
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    uploadBaner(file)    
  }

  const uploadAvatar = (file: any) => {

    const fileSize = file.size;

    const fileRule = () => {
      const fileNameSplit = (file.name).split(".")
      const extension = fileNameSplit.pop();
      console.log(extension)
      return ((extension == "png" || extension == "jpg") && fileSize <= 8 * 1024 * 1024) ? true : false;
    }

    if(fileRule()){
     
      let formData = new FormData();
      formData.append('file', file);
      let xhr = new XMLHttpRequest(); 

      xhr.upload.onprogress = function(event) {
        avatarHoverMenu.current.style.opacity = 1;
        console.log(`${event.loaded} - ${event.total}`);
        const uploadPercent = (event.loaded/event.total)*100
        avatarProgressBar.current.style.width = (uploadPercent < 100)? uploadPercent + '%' : "0%" ;
      };

      xhr.open('POST', `${pikoSelector?.cdn}/temp/avatar`, true);
      xhr.responseType = 'json';

      xhr.onload = function(){
        var data = xhr.response;
        console.log(data.status)
        if(data.status){
          avatarHoverMenu.current.style.opacity = 0;
          setNewProfileObject((prevProfileObject) => ({
            ...prevProfileObject,
            avatar: data.tempToken
          }));
          avatarUploadIco.current.src = `${pikoSelector?.cdn}/${data.tempToken}`
        } else {

        }
      }

      xhr.send(formData);

    } else {
      console.warn('unsupported file extension')
    }
  }

  const avatarHoverFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      uploadAvatar(file);
    }
  };
  
  
  const avatarDrop = (event: React.DragEvent) =>{
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    uploadAvatar(file)    
  }

  const bioChange = (event: any) =>{
    setNewProfileObject((prevProfileObject) => ({
      ...prevProfileObject,
      bio: event.target.value
    }));
  }

  function sendChanges() {
    console.log(JSON.stringify(newProfileObject)); // Добавленный вывод
    fetch(`${pikoSelector.api}/api/user/profile`, { 
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProfileObject)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("error:", error));
  
    return true;
  }
  

  return (
     <div className="body-container">
      
      <a className="text">{getText("flow/editProfile.previewMode")}</a>

      <div className="edit-profile-container"> 

      <div className="demo-profile-container">
  
  <div className="profile">

    <div className="about-user">

        <div className="avatar-hover" >
          <div ref={avatarHoverMenu} className="hover-menu">
          < input onChange={avatarHoverFileInput} onDrop={avatarDrop} className="upload-element" type="file" accept=".png,.jpeg"></input>

            <img  className="upload-ico" src={uploadIco} />
            <a ref={avatarHoverText} className="hover-text">{getText("flow/editProfile.editAvatar")}</a>
            <div className="progress-bar-container">
              <div ref={avatarProgressBar} className="progress-bar"></div>
            </div>
          </div>
          <img ref={avatarUploadIco} className="avatar" src={`${pikoSelector?.cdn}/${whoamiSelector?.avatar}`} ></img>
        </div>

        <div  className="baner-hover" >
          <div ref={banerHoverMenu} className="hover-menu">
            < input onChange={banerHoverFileInput} onDrop={banerDrop} className="upload-element" type="file" accept=".png,.jpg"></input>

            <img className="upload-ico" src={uploadIco} />
            <a ref={banerHoverText} className="hover-text">{getText("flow/editProfile.editBaner")}</a>
            <div className="progress-bar-container">
              <div ref={banerProgressBar} className="progress-bar"></div>
            </div>
          </div>
          <img ref={banerUploadIco} className="baner" src={`${pikoSelector?.cdn}/${whoamiSelector?.baner}`} />
        </div>

      <div className="creditial">

        <a id="nickname">{whoamiSelector?.nickname}</a>
        <a id="username">{whoamiSelector?.username}</a>
      </div>

      <div className="bio-container">
        <textarea onChange={bioChange} id="bio" maxLength={350} placeholder={ (whoamiSelector?.bio != "")?  whoamiSelector?.bio : getText("flow/editProfile.createBio")}></textarea>
      </div>

    </div>
  </div>
</div>

    <div className="send-edit-container">
      <button onClick={ () => (sendChanges())} className="send-edit-button">
        <a className="edit-text"> {getText("apply")} </a>
      </button>
    </div>

       </div>

     </div>
     )
}

export default EditProfile;
