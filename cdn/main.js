const express = require('express')

const PORT = process.env.PORT || 3002
const app = express();

const takeFile = require('./components/cdn/takeFile')

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
app.use("/cdn", takeFile)

app.listen(PORT, () =>{
    console.log(`server is started on port ${PORT}`)
 })