const express = require('express')
// const midleware = require('./midleware')
const PORT = process.env.PORT || 3001
const app = express();

const whoami = require('./api/user/whoami.js')
const signin = require('./api/auth/signin.js')
const login = require('./api/auth/login.js')
const isMailUnique = require('./api/auth/isMailUnique.js')
const isUsernameUnique = require('./api/auth/isUsernameUnique.js')
const isNicknameUnique = require('./api/auth/isNicknameUnique.js')

const posts = require('./api/post/posts.js')

const pikoSet = require('./api/stuff/pikoset')
const p =require('./api/user/p.js')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());

app.use('/api/user', whoami)
app.use('/api/auth', signin)
app.use('/api/auth', isMailUnique)
app.use('/api/auth', isUsernameUnique)
app.use('/api/auth', isNicknameUnique)
app.use('/api/auth', login)
app.use('/api/', pikoSet)
app.use('/api', p)
app.use('/api/post/', posts)

app.listen(PORT, () =>{
    console.log(`server is started on port ${PORT}`)
 })