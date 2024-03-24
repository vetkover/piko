import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate, useParams } from "react-router";
import "./Chats.scss";
import { useSelector } from "react-redux";

//import PlayerModule from "../../components/dokoa-player/playerModule";

import deleteIco from'./xIco.svg'
import sendIco from "./sendIco.svg";
import socialEmpty from "./socialEmpty.png"
import answerIco from './answerIco.svg'

function MessagesIsEmpty(){
  return(
    <div className="empty-messages-container">
      <img src={socialEmpty} />
      <a>кажется здесь ничего нет</a>
    </div>
  )
}

function Chats() {
  const pikoSelector = useSelector((state: any) => state.pikoset);
  const whoamiSelector = useSelector((state: any) => state.whoami);

  const [activeChat, setActiveChat] = useState<any>();
  const navigate = useNavigate();
  const messageContainer = useRef<any>()
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if(activeChat != undefined){
    const newSocket = new WebSocket(`ws://localhost:8080/chats/${activeChat}`);
    setSocket(newSocket);
    }
    //return () => newSocket.close();
  }, [activeChat]);

  socket?.addEventListener('open', function (event) {
    console.log('Соединение установлено');
  });

  function sendMessage(message: any) {
    setReplyObj(undefined)
    if (socket?.readyState === WebSocket.OPEN && messageText.current!.innerText != "") {
      fetch(`${pikoSelector.api}/api/chats/send/${activeChat}`, {
        method: 'POST', 
        mode: 'cors', 
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          text: message.text,
          replyId: message.replyId 
        })
      })
      .then(response => response.json())
      .then(data => {
        messageText.current!.innerText = ""
      })
      
      .catch(error => console.error('Error:', error));
      
    } else {
        console.log('Соединение не установлено или отказано в отправке');
    }
  }
    

  const [exampleChatList, setExampleChatList] = useState<any>()

  const [exampleMessageList,setExampleMessageList] = useState<any>([])
  const [chatData, setChatData] = useState<any>()

  useLayoutEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }, [exampleMessageList, activeChat]);

  useEffect(() => {

    if(activeChat !== undefined){
      fetch(`${pikoSelector.api}/api/chats/info/${activeChat}`, {
        method: 'GET', 
        mode: 'cors', 
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json' 
        }
      })
      .then(response => response.json())
      .then(data => {
        setChatData(data);
      }).catch(error => console.error('Error:', error));
    }

  }, [activeChat]);

  useEffect(()=> {
    fetch(`${pikoSelector.api}/api/chats/list`, {
      method: 'GET', 
      mode: 'cors', 
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json' 
      }
    })
    .then(response => response.json())
    .then(data => {
      setExampleChatList(data);
    }).catch(error => console.error('Error:', error));

    fetch(`${pikoSelector.api}/api/chats/read/${activeChat}`, {
      method: 'GET', 
      mode: 'cors', 
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json' 
      }
    })
    .then(response => response.json())
    .then(data => {
      setExampleMessageList(data);
    }).catch(error => console.error('Error:', error));
  },[activeChat])


  useEffect(() => { 
    
    const messageListener = (event: { data: string; }) => {
      const data = JSON.parse(event.data)

      switch(data.option){ 
        case"newMessage":
        if(activeChat !== undefined){
          setExampleMessageList((exampleMessageList: any) => [...exampleMessageList, data]);
          }
        break;

        case "deleteMessage":
          if (activeChat !== undefined) {
            const messageIdToDelete = data.messageId;
            setExampleMessageList((prevMessages: any) => prevMessages.filter((msg: any) =>{ 
              return (msg.messageId !== Number(messageIdToDelete))}));
          }
          break;

      }

    };
     socket?.addEventListener('message', messageListener);
     return () => {
      socket?.removeEventListener('message', messageListener);
    };
   }, [activeChat,exampleMessageList ]);

  const messageText = useRef<any>()

  function convertUnixTime(unixTime: number) {
    const date = new Date(unixTime);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${((hours + 11) % 12 + 1)}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return { formattedDate, formattedTime };
  }


function deleteMessage(messageId: number){
  fetch(`${pikoSelector.api}/api/chats/deletemessage/${activeChat}?messageId=${messageId}`, {
    method: 'GET', 
    mode: 'cors', 
    credentials: 'include', 
    headers: {
      'Content-Type': 'application/json' 
    }
  })
  .then(response => response.json())
  .then(data => {
  }).catch(error => console.error('Error:', error));
}

const [replyObj, setReplyObj] = useState<any>()
const replyContainer = useRef<any>()


function answerOnMessage(object: any){
  setReplyObj(object)
}

function ReplyContainer(){
  
  if(replyObj != undefined){

    return(
      <div ref={replyContainer} className="reply-container">
        <div className="answer-decor">
          <img id="answerIco" src={answerIco} />
          <div className="border-colorline" />
      </div>
        <div className="anser-message">
          <div className="user-to-reply"> {replyObj.author}</div>
          <div className="text-from-reply-message" > {replyObj.text}</div>
      </div>
      <div className="answer-close">
        <img id="cancel-button" src={deleteIco} onClick={()=> {setReplyObj(undefined)}}/>
      </div>
    </div>
    )
  } else {
    return <React.Fragment />
  }
}

  return (
    <div className="chats-container">
      <div className="left-container">
        <div className="list-panel" />

        <div className="chats-list-container">

            {exampleChatList?.length === 0 ? <MessagesIsEmpty /> : <React.Fragment /> }

          {exampleChatList?.map( (object: any, index: number) => {

            let targetUser: any;
            
            if(object.type === "direct"){
              
              targetUser = object.accessUsers.filter((obj: any)=> obj !== whoamiSelector.username)[0];
            }

            return (
            <div className="chat-option-body" key={object.chatId}>
              <button
                className="chat-changer"
                onClick={() => {
                  setActiveChat(object.chatId);
                }}
              />

              <div id="left-container">
                <img className="chats-ico" src={`${pikoSelector.cdn}/${"defaultAvatar"}`} />
              </div>
              <div id="right-container">
                <div className="chat-info">
                  <div className="chat-name">{targetUser}</div>
                  <div className="last-message-time"></div>
                </div>
                <div className="chat-last-message">
                  {object.chatLastMessage? object.chatLastMessage: "кажется здесь пусто"}
                </div>
              </div>
            </div>
)})}

        </div>
      </div>

      <div className="middle-container">
        <div className="list-panel" />

        <div ref={messageContainer} className="message-container">
          {exampleMessageList.map((object: any) => {

            const isUserMessage = object.author === whoamiSelector.username;
            return(
            <div className="message-body" key={object.messageId}>
              <img
                id="avatar"
                src={`${pikoSelector.cdn}/${chatData?.aboutUsers[object.author]?.src}`}
                onClick={() => {
                  navigate(`/p/${object.author}`);
                }}
              />

              <div id="content">



                <div className="info">
                  <div className="author">{object.author}</div>
                  <div className="time"> {convertUnixTime(object.createTime).formattedDate} {convertUnixTime(object.createTime).formattedTime} </div>
                </div>

                {object?.answerMessage?.status?

                  <div className="answer-body"> 
                    <div className="line"/>
                    <div className="answer-message">
                      <div className="answer-author" >{object.answerMessage.anAuthor} </div>
                      <div className="answer-text" >{object.answerMessage.anText} </div>
                    </div>
                  </div>

                  : <React.Fragment />}

                <div className="message-data">

                  {(() => {
                    if (object.text)
                      return <div className="message-text"> {object.text}</div>;
                  })()}

                </div>
              </div>

                  <div className="message-control-container">
                    
                  {isUserMessage? 
                    <img id="deleteIco" src={deleteIco} onClick={()=>deleteMessage(object.messageId)}/>
                    : <React.Fragment />}
                    <img id="answerIco" src={answerIco} onClick={()=>answerOnMessage(object)}/>
                  </div>
                  
          
            </div>

          )})}
        </div>

        <div className="message-input-container">

          <ReplyContainer />

          <div className="message-top-container">
            <div id="input" placeholder="input message" ref={messageText} contentEditable></div>
            <div className="send-message-button">
              <img src={sendIco} onClick={() => {
              const message = {
                text: messageText.current.innerText,
                replyId: replyObj?.messageId
              };
             sendMessage(message);
            }}/>
          </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Chats;
