import React, { createRef, useEffect, useRef, useState } from "react";
import { getText } from "../../components/languageProcessing/localize";
import { useNavigate, useParams } from "react-router";
import "./Chats.scss";
import { useDispatch, useSelector } from "react-redux";

import PlayerModule from "../../components/dokoa-player/playerModule";

import avatar404 from "./404avatar.png";
import sendIco from "./sendIco.svg";
import { whoami } from "../../redux/reducers/whoami";

const socket = new WebSocket('ws://localhost:8080/chats/1');

socket.addEventListener('open', function (event) {
  console.log('Соединение установлено');
});


function sendMessage(message: string) {
if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
} else {
    console.log('Соединение не установлено');
    
}
}



function Chats() {
  const pikoSelector = useSelector((state: any) => state.pikoset);
  const whoamiSelector = useSelector((state: any) => state.whoami);

  const [activeChat, setActiveChat] = useState<any>();
  const navigate = useNavigate();



  const exampleChatList = [
    {
      chatName: "chat name example",
      chatIco: avatar404,
      chatLastMessage: "фтж ыщ эзвш ошг2 пцжоa sd qwe2  asd qwe q we",
      chatId: 2,
    },
    {
      chatName: "chat name example2",
      chatIco: avatar404,
      chatLastMessage: "фтж ыщ эзвш ошг2 пцжоa sd qwe2  asd qwe q we",
      chatId: 3,
    },
  ];

  const [exampleMessageList,setExampleMessageList] = useState<any>([
    {
      author: "nara",
      createTime: 1710268365,
      text: "привет сообщение для примера, это сообщение автора!",
      messageId: 5,
      images: [],
      videos: [],
      sounds: [],
    },
    {
      author: "nesm",
      createTime: 1710269365,
      text: "привет сообщение для примера, это сообщение не автора хы!",
      messageId: 6,
      images: [],
      videos: [],
      sounds: [],
    },
  ])
  useEffect(() => {
    socket.addEventListener('message', function (event) {
      console.log('Сообщение от сервера: ', event.data);
      setExampleMessageList([...exampleMessageList,JSON.parse(event.data)])
      console.log(exampleMessageList)
    });
  }, [exampleMessageList])



  const messageText = useRef<any>()

  function convertUnixTime(unixTime: number) {
    const date = new Date(unixTime * 1000);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${((hours + 11) % 12 + 1)}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return { formattedDate, formattedTime };
  }

  return (
    <div className="chats-container">
      <div className="left-container">
        <div className="list-panel" />

        <div className="chats-list-container">
          {exampleChatList.map((object, index) => (
            <div className="chat-option-body">
              <button
                className="chat-changer"
                onClick={() => {
                  alert("click");
                }}
              />

              <div id="left-container">
                <img className="chats-ico" src={object.chatIco} />
              </div>
              <div id="right-container">
                <div className="chat-info">
                  <div className="chat-name">{object.chatName}</div>
                  <div className="last-message-time"></div>
                </div>
                <div className="chat-last-message">
                  {object.chatLastMessage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="middle-container">
        <div className="list-panel" />

        <div className="message-container">
          {exampleMessageList.map((object: any) => (
            <div className="message-body" key={object.messageId}>
              <img
                id="avatar"
                src={avatar404}
                onClick={() => {
                  navigate(`/p/${object.author}`);
                }}
              />

              <div id="content">
                <div className="info">
                  <div className="author">{object.author}</div>
                  <div className="time"> {convertUnixTime(object.createTime).formattedDate} {convertUnixTime(object.createTime).formattedTime} </div>
                </div>
                <div className="message-data">

                  {(() => {
                    if (object.text)
                      return <div className="message-text"> {object.text}</div>;
                  })()}

                </div>
              </div>
            </div>

          ))}
        </div>

        <div className="message-input-container">
          <div className="message-top-container">
            <div id="input" placeholder="input message" ref={messageText} contentEditable></div>
            <div className="send-message-button">
              <img src={sendIco} onClick={()=>sendMessage(messageText.current!.innerText)}/>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Chats;
