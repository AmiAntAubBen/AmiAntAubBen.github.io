var express = require('express');
const app = express();
var path = require('path');
var port=8081;
const mongoose = require('./db');



app.use(express.static(path.join(__dirname,'assets')));

var serialSchema = new mongoose.Schema({
    publicationDate: Number,
    language_detect : String,
    rank: Number,
    album_genre: String,
    artist: String
});

var Wasabi = mongoose.model('wasabiData', serialSchema, 'albums');

app.get("/",(req, res) => {
  res.sendFile(path.join(__dirname,'/views/index.html'));
});
var result= new Array()

app.get("/getAlbumData",(req,res)=> {
    Wasabi.find( {publicationDate : 2012 }, function (err, doc) {

           /* doc.forEach(function(data)
                {
                    for(var i in data)
                    {
                        if(data[i]==null || data[i]=='')
                        {
                            data.remove(i)
                        }
                        result.push(data[i])
                    }


                })*/

            res.send(doc)
            console.log(doc)
    }).limit(10).sort({deezerFans : 1})
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
/*
app.listen(port, () => {
  console.log("Server listening at "+port)
});*/

module.exports.result = result;


