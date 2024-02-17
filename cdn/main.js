const express = require('express')

const PORT = process.env.PORT || 3002
const app = express();

const takeFile = require('./components/cdn/takeFile')
const temp = require('./components/cdn/temp')

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
app.use("/cdn", takeFile)
app.use("/cdn", temp)

// yggdrasil - data exchange between piko servers

const helloworld = require('./yggdrasil/receiving/helloworld.js')
const movetempfile = require('./yggdrasil/receiving/moveTempFile')
const deletefile = require('./yggdrasil/receiving/deleteFile.js')
const yggdrasilMidleware = require('./yggdrasil/yggdrasilMidleware.js');

app.use(yggdrasilMidleware)
app.use('/yggdrasil/', helloworld)
app.use('/yggdrasil/', movetempfile)
app.use('/yggdrasil/', deletefile)

app.listen(PORT, () =>{
    console.log(`server is started on port ${PORT}`)
 })