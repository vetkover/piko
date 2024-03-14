const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const parseCookies = require('../stuff/cookieReader')
const whoami = require('../stuff/whoami');

const clients = [];

wss.on('connection', async function connection(ws, req) {
  const clientId = generateUniqueId();
  const token = parseCookies(req.headers.cookie).token
  let userData = await whoami(token)

  let userObj ={}

  userObj.ws = ws;
  userObj.url = req.url;
  userObj.user = userData.username;
  clients[clientId] = userObj

  ws.on('message', function incoming(message) {
    console.log(`Клиент ${clientId} отправил сообщение: ${message}`);
    //console.log(clients)
    
    let obj = {
        author: "nara",
        createTime: 1710269365,
        text: message.toString('utf-8'),
        messageId: Math.random(),
        images: [],
        videos: [],
        sounds: [],
      }

    chatUpdate("/chats/1", obj)
  });

  ws.on('close', function close() {
    delete clients[clientId];
  });
});

function sendMessageToClient(clientId, message) {
    const client = clients[clientId].ws;
    if (client && client.readyState === WebSocket.OPEN) {
      const messageString = JSON.stringify(message);
      client.send(messageString);
    } else {
      console.log(`Клиент с ID ${clientId} не найден или соединение закрыто`);
    }
  }
  

function chatUpdate(chatID, updateObj){
    usersInChat = Object.values(clients).filter((value) => {
        return value.url === chatID;
    });
    usersInChat.map((value, index)=>{
        value.ws.send(JSON.stringify(updateObj))
    })
    console.log(usersInChat);
}




function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

console.log('WebSocket сервер');
