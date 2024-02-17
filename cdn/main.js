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
const yggdrasilMidleware = require('./yggdrasil/yggdrasilMidleware.js');

app.use(yggdrasilMidleware)
app.use('/yggdrasil/', helloworld)

app.listen(PORT, () =>{
    console.log(`server is started on port ${PORT}`)
 })