import React, { useEffect, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import './editProfile.scss'
import uploadIco from './uploadIco.svg' 

function EditProfile() {
  const pikoSelector = useSelector((state: any) => state.pikoset)
  const whoamiSelector = useSelector((state: any) => state.whoami)


  const avatarDrop = (event: React.DragEvent) =>{
    event.preventDefault()

    const file = event.dataTransfer.files[0]
    const fileSize = file.size;

    const fileRule = () => {
      const fileNameSplit = (file.name).split(".")
      const extension = fileNameSplit.pop();
      return (extension === "png" || extension === "jpeg" && fileSize <= 15) ? true : false;
    }

    if(fileRule()){
     
      let formData = new FormData();
      formData.append('file', file);
      let xhr = new XMLHttpRequest(); 

      xhr.upload.onprogress = function(event) {
        console.log(`${event.loaded} - ${event.total}`);
      };

      xhr.open('POST', `${pikoSelector?.cdn}/temp/avatar`, true);
      xhr.send(formData);

    } else {
      console.warn('расширение файла не подходит')
    }

  }


  return (
     <div className="body-container">
      
      <a className="text">{getText("flow/editProfile.previewMode")}</a>

      <div className="edit-profile-container"> 

      <div className="demo-profile-container">
  
  <div className="profile">

    <div className="about-user">

        <div className="avatar-hover" >
          <div className="hover-menu">
          < input onDrop={avatarDrop} className="upload-element" type="file" accept=".png,.jpeg"></input>

            <img className="upload-ico" src={uploadIco} />
            <a className="hover-text">{getText("flow/editProfile.editAvatar")}</a>
          </div>
          <img className="avatar" src={`${pikoSelector?.cdn}/${whoamiSelector?.avatar}`} ></img>
        </div>

        <div className="baner-hover" >
          <div className="hover-menu">
            < input className="upload-element" type="file" accept=".png,.jpeg"></input>
            <img className="upload-ico" src={uploadIco} />
            <a className="hover-text">{getText("flow/editProfile.editBaner")}</a>
          </div>
          <img className="baner" src={`${pikoSelector?.cdn}/${whoamiSelector?.baner}`} />
        </div>

      <div className="creditial">

        <a id="nickname">{whoamiSelector?.nickname}</a>
        <a id="username">{whoamiSelector?.username}</a>
      </div>

      <div className="bio-container">
        <textarea id="bio" maxLength={350} placeholder={ (whoamiSelector?.bio != "")?  whoamiSelector?.bio : getText("flow/editProfile.createBio")}></textarea>
      </div>

    </div>
  </div>
</div>

    <div className="send-edit-container">
      <button className="send-edit-button">
        <a className="edit-text"> {getText("apply")} </a>
      </button>
    </div>

       </div>

     </div>
     )
}

export default EditProfile;
