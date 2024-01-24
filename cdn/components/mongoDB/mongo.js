const { MongoClient } = require("mongodb");
 const uri = "mongodb://piko:citofredifasber@localhost:27017/?authMechanism=DEFAULT";
 const mongo = new MongoClient(uri, { useUnifiedTopology: true });
 
 module.exports = mongo;