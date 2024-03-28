const express = require('express')

const ws = require('./components/websocket/ws.js')
// const midleware = require('./midleware')
const PORT = process.env.PORT || 3001
const app = express();



const signin = require('./api/auth/signin.js')
const login = require('./api/auth/login.js')
const isMailUnique = require('./api/auth/isMailUnique.js')
const isUsernameUnique = require('./api/auth/isUsernameUnique.js')
const isNicknameUnique = require('./api/auth/isNicknameUnique.js')

const posts = require('./api/post/posts.js')
const create = require('./api/post/create.js')
const deletePost = require('./api/post/delete.js')

const pikoSet = require('./api/stuff/pikoset')

const whoami = require('./api/user/whoami.js')
const p = require('./api/user/p.js')
const userAvatar = require('./api/user/userAvatar.js')
const profile = require('./api/user/profile.js')

const list = require('./api/chats/list.js')
const send = require('./api/chats/send.js')
const read = require('./api/chats/read.js')
const info = require('./api/chats/info.js')
const deletemessage = require('./api/chats/delete.js')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());

app.use('/api/user', profile)
app.use('/api/user', whoami)
app.use('/api/user', userAvatar)

app.use('/api/auth', signin)
app.use('/api/auth', isMailUnique)
app.use('/api/auth', isUsernameUnique)
app.use('/api/auth', isNicknameUnique)
app.use('/api/auth', login)

app.use('/api/', pikoSet)
app.use('/api', p)

app.use('/api/post/', posts)
app.use('/api/post/', create)
app.use('/api/post/', deletePost)

app.use('/api/chats/', list)
app.use('/api/chats/', send)
app.use('/api/chats/', read)
app.use('/api/chats/', info)
app.use('/api/chats/', deletemessage)


// yggdrasil - data exchange between piko servers

const yggdrasilMidleware = require('./yggdrasil/yggdrasilMidleware.js');

app.use(yggdrasilMidleware)


app.listen(PORT, () =>{
    console.log(`server is started on port ${PORT}`)
 })