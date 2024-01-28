import React, { useEffect, useRef, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import "./Auth.scss";

import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";

import eye_close from "./eye_close.svg";
import eye_open from "./eye_open.svg";
import exclam from './exclam.svg';
import loading from './loading.svg';
import approve from './approve.svg';

import backgroundVideo from './backgroundVideo.mp4'
import { useSelector } from "react-redux";

const VideoCanvas = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const drawFrame = () => {
      if (!ctx || !videoRef.current) return;

      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawFrame);
    };

    const startDrawing = () => {
      if (!videoRef.current) return;
      videoRef.current.play();
      drawFrame();
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('canplay', startDrawing);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('canplay', startDrawing);
      }
    };
  }, []);

  return (
    <div className="canvas-background">
      <video loop id="video" muted ref={videoRef} width="0" height="0">
        <source src={backgroundVideo} type="video/mp4" />
        
      </video>
      <canvas className="canvasVideo" ref={canvasRef} width="1920" height="1080"></canvas>
    </div>
  );
};

function Auth() {
  const login_container = useRef<any>(null);
  const signIn_container = useRef<any>(null);

  const [updateAuth, setUpdateAuth] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get("type");

    switch (paramValue) {
      case "login": {
        if (login_container.current && signIn_container.current) {
          login_container.current.style.display = "inherit";
          signIn_container.current.style.display = "none";
        }
        break;
      }

      case "signin": {
        if (login_container.current && signIn_container.current) {
          login_container.current.style.display = "none";
          signIn_container.current.style.display = "inherit";
        }
        break;
      }

      default: {
        if (login_container.current) {
          login_container.current.style.display = "inherit";
        }
      }
    }
  }, [updateAuth]);



  // Login state and handlers
  const [loginEnable, setLoginEnable] = useState<boolean>(true);
  const [passwordEyeStatus, setPasswordEyeStatus] = useState<any>(eye_close);
  const loginInput = useRef<HTMLInputElement>(null);
  const loginText = useRef<HTMLAnchorElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordText = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();
  const pikoSelector = useSelector((state: any)=> state.pikoset)
  const loginSomethingWrong = useRef<any>(null);
  function loginFetch() {

    if(fetchLoaderRef.current && login_container.current){
      login_container.current.style.display = "none";
      fetchLoaderRef.current.style.display = "flex";
    }
    
    fetch(`${pikoSelector.api}/api/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 
    "password": ( (() => {if(passwordInput.current){return passwordInput.current.value}})()),
    "username": ( (() => {if(loginInput.current){return loginInput.current.value}})()),
  })
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(async data => {
    if(data.message){
      document.cookie = `token=${data.token}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
      navigate("/profile")
    } else {
      if(fetchLoaderRef.current && login_container.current && somethingWrong.current){
        login_container.current.style.display = "flex";
        fetchLoaderRef.current.style.display = "none";
        loginSomethingWrong.current.style.display = "block";
      }
    }
  })
  .catch(error => {
    if(fetchLoaderRef.current && login_container.current && somethingWrong.current){
      login_container.current.style.display = "flex";
      fetchLoaderRef.current.style.display = "none";
      loginSomethingWrong.current.style.display = "block";
    }
  });
}


  const signIn_button = () => {
    navigate("/auth?type=signin");
    setUpdateAuth(1);
  };

  const eyeChange = () => {
    if (passwordInput.current && passwordInput.current.type === "password") {
      setPasswordEyeStatus(eye_open);
      passwordInput.current.type = "text";
    } else {
      if (passwordInput.current) {
        setPasswordEyeStatus(eye_close);
        passwordInput.current.type = "password";
      }
    }
  };

  const loginFocus = () => {
    if (loginText.current) {
      loginText.current.style.animation = "inputFocusIn 0.5s forwards ease";
    }
  };

  const loginBlur = () => {
    if (loginText.current && loginInput.current) {
      if (loginInput.current.value.length > 0) {
      } else {
        loginText.current.style.animation = "inputFocusOut 0.5s forwards ease";
      }
    }
  };

  const passwordFocus = () => {
    if (passwordText.current) {
      passwordText.current.style.animation = "inputFocusIn 0.5s forwards ease";
    }
  };

  const passwordBlur = () => {
    if (passwordText.current && passwordInput.current) {
      if (passwordInput.current.value.length > 0) {
      } else {
        passwordText.current.style.animation = "inputFocusOut 0.5s forwards ease";
      }
    }
  };

  function loginButtonIsEnabled() {
    if (loginInput.current && passwordInput.current) {
      loginInput.current.value.length > 0 &&
      passwordInput.current.value.length > 0
        ? setLoginEnable(false)
        : setLoginEnable(true);
    }
    return;
  }

  // Sign In state and handlers
  const somethingWrong = useRef<any>(null)

  const signInInput = useRef<HTMLInputElement>(null);
  const signInText = useRef<any>(null);

  const signInpasswordInput = useRef<HTMLInputElement>(null);
  const signInpasswordText = useRef<HTMLAnchorElement>(null);

  const mailText = useRef<any>(null);
  const mailInput = useRef<any>(null);

  const nicknameInput = useRef<any>(null);
  const nicknameText = useRef<any>(null);

  const usernameStatus = useRef<any>(null);
  const mailStatus = useRef<any>(null);
  const nicknameStatus = useRef<any>(null);

  const [usernameContainerStatus, setUsernameContainerStatus] = useState<any>();
  const [mailContainerStatus, setMailContainerStatus] = useState<any>();
  const [nicknameContainerStatus, setNicknameContainerStatus] = useState<any>();

  const [signinButtonEnable, setSigninButtonEnable] = useState<any>(true);
  
  //////////
  const [signinButtonRules, setSigninButtonRules] = useState<any>([,,,,]);
  // [0] = email [1] = username [2] = nickname [3] = password
  /////////
  
  const changeRulesAtIndex =  (index: number, newValue: boolean) => {
     setSigninButtonRules((prevRules: any) => {
      let arrCopy = [...prevRules];
      arrCopy[index] = newValue;
      signinButtonCheckRules(arrCopy);
      return arrCopy;
    });
  };
  

  function signinButtonCheckRules(arr: any){
    let rulesArr = arr;
    if (rulesArr.every((values: any) => values == true)) {
      setSigninButtonEnable(false)
  } else {
    setSigninButtonEnable(true)
  }
  }


  const passwordRules= () => {
    let passwordRegex = /^[a-zA-Z0-9!@#$%^&*_=+-]*$/;
      if(signInpasswordInput.current && signInpasswordInput.current.value.length > 4 && passwordRegex.test(signInpasswordInput.current.value)){
        changeRulesAtIndex(3, true)
        return true;
      } else{
        changeRulesAtIndex(3, false)
        return false;
      }

  }

  const nicknameFocus = () => {
    if (nicknameText.current) {
      nicknameText.current.style.animation = "inputFocusIn 0.5s forwards ease";
    }
  };

  const nicknameBlur = () => {
    if (nicknameText.current && nicknameInput.current) {
      if (nicknameInput.current.value.length > 0) {
      } else {
        nicknameText.current.style.animation = "inputFocusOut 0.5s forwards ease";
      }
    }
  };

  const mailFocus = () => {
    if (mailText.current) {
      mailText.current.style.animation = "inputFocusIn 0.5s forwards ease";
    }
  };

  const mailBlur = () => {
    if (mailText.current && mailInput.current) {
      if (mailInput.current.value.length > 0) {
      } else {
        mailText.current.style.animation = "inputFocusOut 0.5s forwards ease";
      }
    }
  };

  const signInFocus = () => {
    if (signInText.current) {
      signInText.current.style.animation = "inputFocusIn 0.5s forwards ease";
    }
  };

  const signInBlur = () => {
    if (signInText.current && signInInput.current) {
      if (signInInput.current.value.length > 0) {
      } else {
        signInText.current.style.animation = "inputFocusOut 0.5s forwards ease";
      }
    }
  };

  const signInPasswordFocus = () => {
    if (signInpasswordText.current) {
      signInpasswordText.current.style.animation =
        "inputFocusIn 0.5s forwards ease";
    }
  };

  const signInPasswordBlur = () => {
    if (signInpasswordText.current && signInpasswordInput.current) {
      if (signInpasswordInput.current.value.length > 0) {
      } else {
        signInpasswordText.current.style.animation =
          "inputFocusOut 0.5s forwards ease";
      }
    }
  };

  const signInEyeChange = () => {
    if (signInpasswordInput.current && signInpasswordInput.current.type === "password") {
      setPasswordEyeStatus(eye_open);
      signInpasswordInput.current.type = "text";
    } else {
      if (signInpasswordInput.current) {
        setPasswordEyeStatus(eye_close);
        signInpasswordInput.current.type = "password";
      }
    }
  };

  function signInFetch() {

    if(fetchLoaderRef.current && signIn_container.current){
      signIn_container.current.style.display ="none";
      fetchLoaderRef.current.style.display = "flex";
    }
    
    fetch(`${pikoSelector.api}/api/auth/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 
    "password": ( (() => {if(signInpasswordInput.current){return signInpasswordInput.current.value}})()),
    "username": ( (() => {if(signInInput.current){return signInInput.current.value}})()),
    "nickname": ( (() => {if(nicknameInput.current){return nicknameInput.current.value}})()),
    "email": ( (() => {if(mailInput.current){return mailInput.current.value}})())


  })
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(async data => {
    if(data.message){
      document.cookie = `token=${data.token}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
      navigate("/profile")
    }
  })
  .catch(error => {
    if(fetchLoaderRef.current && signIn_container.current && somethingWrong.current){
      signIn_container.current.style.display ="flex";
      fetchLoaderRef.current.style.display = "none";
      somethingWrong.current.style.display = "block";
      isNicknameUnique()
      isMailUnique()
      isUsernameUnique()
    }
  });
}


function isMailUnique() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  changeRulesAtIndex(0, false)
  if(mailInput.current && mailInput.current.value.length > 2){
  } else {
    setMailContainerStatus(exclam)
    if(mailStatus.current){
      mailStatus.current.style.animation = "none"
    }
  }

  if(mailInput.current && emailRegex.test(mailInput.current.value) && mailInput.current && mailInput.current.value.length > 2){
    
    setMailContainerStatus(loading)

    if(mailStatus.current){
      mailStatus.current.style.animation = "rotateLoading 1s infinite linear"
    }

    fetch(`${pikoSelector.api}/api/auth/ismailunique`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        "email": ( (() => {if(mailInput.current){return mailInput.current.value}})())
      })
      }).then(response => response.json())
      .then(data => {
        if(data.message == true){
        
          setMailContainerStatus(approve)
          if(mailStatus.current){
            mailStatus.current.style.animation = "none"
            changeRulesAtIndex(0, true)
            return true;
          }

        } else{ 
          setMailContainerStatus(exclam)
          if(mailStatus.current){
            mailStatus.current.style.animation = "none"
            changeRulesAtIndex(0, false)
            return false;
          }
        }
      })


  } else {
    setMailContainerStatus(exclam)
    if(usernameStatus.current){
      usernameStatus.current.style.animation = "none"
    }
    return true;
  }
}

async function isUsernameUnique() {
  const usernameRegex = /^[a-zA-Z0-9-_]+$/;
  await changeRulesAtIndex(1, false)
  if(signInInput.current && signInInput.current.value.length > 2){
  } else {
    setUsernameContainerStatus(exclam)
    if(usernameStatus.current){
      usernameStatus.current.style.animation = "none"
    }
  }

  if(signInInput.current && usernameRegex.test(signInInput.current.value) && signInInput.current && signInInput.current.value.length > 2){
    
    setUsernameContainerStatus(loading)
    if(usernameStatus.current){
      usernameStatus.current.style.animation = "rotateLoading 1s infinite linear"
    }

    const response = await fetch(`${pikoSelector.api}/api/auth/isusernameunique`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        "username": ( (() => {if(signInInput.current){return signInInput.current.value}})())
      })
      }).then(response => response.json())
      .then(async data => {
        if(data.message == true){
          
          if(usernameStatus.current){
            usernameStatus.current.style.animation = "none"
          }
          setUsernameContainerStatus(approve)
          await changeRulesAtIndex(1, true)
          return true;
        } else{ 
          
          if(usernameStatus.current){
            usernameStatus.current.style.animation = "none"
          }
          setUsernameContainerStatus(exclam)
          await changeRulesAtIndex(1, false)
          return false;
        }
      })


  } else {
    await changeRulesAtIndex(1, false)
    setUsernameContainerStatus(exclam)
    if(usernameStatus.current){
      usernameStatus.current.style.animation = "none"
    }
    return false;
  }
}

function isNicknameUnique() {
  const nicknameRegex = /^\S.*\S$|^\S$/;
  changeRulesAtIndex(2, false)
  if(nicknameInput.current && nicknameInput.current.value.length > 2){
  } else {
    setNicknameContainerStatus(exclam)
    if(nicknameStatus.current){
      nicknameStatus.current.style.animation = "none"
    }
  }

  if(nicknameInput.current && nicknameRegex.test(nicknameInput.current.value) && nicknameInput.current && nicknameInput.current.value.length > 2){
    
    setNicknameContainerStatus(loading)
    if(nicknameStatus.current){
      nicknameStatus.current.style.animation = "rotateLoading 1s infinite linear"
    }

    fetch(`${pikoSelector.api}/api/auth/isnicknameunique`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        "nickname": ( (() => {if(nicknameInput.current){return nicknameInput.current.value}})())
      })
      }).then(response => response.json())
      .then(data => {
        if(data.message == true){
        
          setNicknameContainerStatus(approve)
          if(nicknameStatus.current){
            nicknameStatus.current.style.animation = "none"
            changeRulesAtIndex(2, true)
            return true;
          }

        } else{ 
          setNicknameContainerStatus(exclam)
          if(nicknameStatus.current){
            nicknameStatus.current.style.animation = "none"
            changeRulesAtIndex(2, false)
          }
          return false;
        }
      })


  } else {
    setNicknameContainerStatus(exclam)
    if(nicknameStatus.current){
      nicknameStatus.current.style.animation = "none"
    }
    changeRulesAtIndex(2, false)
  }
  return false;
}

/////// fetch-loader
const fetchLoaderRef = useRef<any>(null)


  return (
    <div className="auth">

    <VideoCanvas/>

      <div className="auth-container">
        <div className="imageP"></div>

        <div className="login-container" ref={login_container}>
          <div className="input-container" onBlur={loginBlur} onFocus={loginFocus}>
            <a ref={loginText}>{getText("auth.loginText")}</a>
            <input ref={loginInput} type="text" onChange={loginButtonIsEnabled} />
          </div>

          <div className="input-container" onBlur={passwordBlur} onFocus={passwordFocus}>
            <a ref={passwordText}>{getText("auth.passwordText")}</a>
            <input
              ref={passwordInput}
              type="password"
              onChange={loginButtonIsEnabled}
            />
            <img id="passwordEyeStatus" src={passwordEyeStatus} onClick={eyeChange} />
          </div>
          <a className="loginSomethingWrong" ref={loginSomethingWrong} >{getText("auth.loginSomethingWrong")}</a>
          <button disabled={loginEnable} id="loginButton" onClick={loginFetch}>
            {getText("auth.loginButton")}
          </button>
          <button id="ForgotPasswordButton">{getText("auth.ForgotPasswordButton")}</button>

          <div className="signIn-down-container">
            <a id="signIn-text">{getText("auth.signIn-text")}</a>
            <button id="signIn-button" onClick={signIn_button}>
              {getText("auth.signIn-button")}
            </button>
          </div>
        </div>

        <div className="fetch-loader" ref={fetchLoaderRef}>
            <img className="animation" src={loading} />
            <a>{getText("auth.fetch-loader")}</a>
          </div>

        <div className="signIn-container" ref={signIn_container}>



        <div className="input-container" onBlur={mailBlur} onFocus={mailFocus}>
            <a ref={mailText}>{getText("auth.newMailText")}</a>
            <input ref={mailInput} type="text" onChange={isMailUnique} />
            <img id="containerStatus" ref={mailStatus} src={mailContainerStatus}/>
          </div>

          <div className="input-container" onBlur={signInBlur} onFocus={signInFocus}>
            <a ref={signInText}>{getText("auth.newLoginText")}</a>
            <input ref={signInInput} type="text" onChange={isUsernameUnique} />
            <img id="containerStatus" ref={usernameStatus} src={usernameContainerStatus} />
          </div>

          <div className="input-container" onBlur={nicknameBlur} onFocus={nicknameFocus}>
            <a ref={nicknameText}>{getText("auth.newNickText")}</a>
            <input ref={nicknameInput} type="text" onChange={isNicknameUnique} />
            <img id="containerStatus" ref={nicknameStatus} src={nicknameContainerStatus}/>
          </div>

          <div
            className="input-container"
            onBlur={signInPasswordBlur}
            onFocus={signInPasswordFocus}
          >
            <a ref={signInpasswordText}>{getText("auth.newPasswordText")}</a>
            <input
              ref={signInpasswordInput}
              type="password"
              onChange={passwordRules}
            />
            <img id="containerStatus" src={passwordEyeStatus} onClick={signInEyeChange} />
          </div>

          <button disabled={signinButtonEnable} onClick={signInFetch} id="signInButton">{getText("auth.signInButton")}</button>
          <a ref={somethingWrong} className="somethingWrong">{getText("auth.somethingWrong")}</a>
        </div>
      </div>
    </div>
  );
}

export default Auth;
