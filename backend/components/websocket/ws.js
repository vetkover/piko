const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const parseCookies = require('../stuff/cookieReader')
const whoami = require('../stuff/whoami');

const wsClients = [];

wss.on('connection', async function connection(ws, req) {
  const clientId = generateUniqueId();
  const token = parseCookies(req.headers.cookie).token
  let userData = await whoami(token)

  let userObj ={}

  userObj.ws = ws;
  userObj.url = req.url;
  userObj.user = userData?.username;
  wsClients[clientId] = userObj

  ws.on('message', function incoming(message) {
    console.log(`Клиент ${clientId} отправил сообщение: ${message}`);
  });

  ws.on('close', function close() {
    delete wsClients[clientId];
  });
});

function sendMessageToClient(clientId, message) {
    const client = wsClients[clientId].ws;
    if (client && client.readyState === WebSocket.OPEN) {
      const messageString = JSON.stringify(message);
      client.send(messageString);
    } else {
      console.log(`Клиент с ID ${clientId} не найден или соединение закрыто`);
    }
  }
  

function chatUpdate(chatID, updateObj, option){
    usersInChat = Object.values(wsClients).filter((value) => {
        return value.url === chatID;
    });
    updateObj.option = option
    usersInChat.map((value, index)=>{
        value.ws.send(JSON.stringify(updateObj))
    })
}


function generateUniqueId() {
  return Math.random().toString(36).substr(2, 15);
}

console.log('WebSocket сервер');

module.exports = chatUpdate;