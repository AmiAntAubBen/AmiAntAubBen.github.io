var express = require('express');
const app = express();
var path = require('path');
var port=8081;
const mongoose = require('mongoose');
require('./db.js');


app.use(express.static(path.join(__dirname,'assets')));

var serialSchema = new mongoose.Schema({publicationDate: String});
var Wasabi = mongoose.model('wasabi', serialSchema, 'albums');

app.get("/",(req, res) => {
  res.sendFile(path.join(__dirname,'/views/index.html'));
});

app.get("/getAlbumData.json",(req,res)=> {
    Wasabi.find({publicationDate: '2010'}, function (err, doc) {

        if (err) {
            console.log("error is", err)
        }
            console.log("data",doc);
            res.send(doc);
            res.end();

    }).limit(56)
})
/*
app.get("/getArtistData", (req, res)=> {
    var serialSchema = new mongoose.Schema({});
    var Wasabi = mongoose.model('wasabi', serialSchema, 'wasabi');


    Wasabi.find({}, function (err, doc) {
        console.log("database",doc);
        res.send(doc);
        res.end();
    })
})*/

app.listen(port, () => {
  console.log("Server listening at "+port)
});


module.exports = app;


