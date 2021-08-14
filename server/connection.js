const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

var MongoClient = require('mongodb').MongoClient;

const dbConfig = require('./database.js');

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url,{ useNewUrlParser: true });

var currencySchema = new mongoose.Schema({
    cu_id: String,
    name: String,
    price: String,
    symbol: String,
});
var currency = mongoose.model("currency", currencySchema);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//save data to database
app.post('/savecurrency', function(req,res){
	// console.log(req.body)
  var myData = new currency(req.body);
      myData.save()
          .then(item => {
              res.status(200).json("Saved")
          })
          .catch(err => {
              res.status(400).send("Unable to save to database");
          });
})

//get saved data
app.get('/savedData', function(req,res){

  MongoClient.connect(dbConfig.url, function(err, db) {
    	useNewUrlParser: true
    if (err) throw err;
    var dbo = db.db("crypto_currencies");
    dbo.collection("currencies").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.status(200).json(result)
      db.close();
    });
  });

})

//get saved currencies id
app.get('/getcurrency',function (req,res) {

    MongoClient.connect(dbConfig.url, function(err, db) {
    	useNewUrlParser: true
    if (err) throw err;
    var dbo = db.db("crypto_currencies");
    const name = { cu_id: 1 , _id: 0 };
    dbo.collection("currencies").find().project(name).toArray(function(err, result) {
      if (err) throw err;
    //   console.log(result)
     var resul= res.status(200).json(result)
      db.close();
    });
  });

    
})

//delete a row in saved data
app.post('/deletedata', function(req,res){

    MongoClient.connect(dbConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("crypto_currencies");
    var myquery = { cu_id: req.body.name };
    // console.log(myquery)
    dbo.collection("currencies").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      res.json("Deleted");
      db.close();
    });
  });
  })

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});