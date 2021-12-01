var express = require('express');
const app = express();
var path = require('path');
var port=8080;
const mongoose = require('mongoose');
require('./db.js');


app.use(express.static(path.join(__dirname,'assets')));


app.get("/",(req, res) => {
  res.sendFile(path.join(__dirname,'/views/index.html'));
});
app.get("/getData",(req,res)=> {
    var serialSchema = new mongoose.Schema();
    var Wasabi = mongoose.model('wasabi', serialSchema, 'wasabi');


    Wasabi.findOne({}, {'name': 1}, function (err, doc) {
        res.send(doc);
        res.end();
    })
})

app.listen(port, () => {
  console.log("Server listening at 8080")
});


module.exports = app;


