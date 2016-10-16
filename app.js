var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var path = require('path');
var app = express();
 
app.use(bodyParser.json({extended:false,limit:"10mb",parameterLimit:10000}));
app.use(bodyParser.urlencoded({ extended: true,limit:"10mb",parameterLimit:10000 }));
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
        if(file.mimetype === "image/jpeg"){
            cb(null, Date.now() + '.jpg')
        }
        else{
            cb(null, Date.now() + '.png')
        }
  }
})

app.get("/", function(req, res){
    res.send("Works!");
})
var upload = multer({storage: storage}).array("uploads[]", 12);
app.post('/upload', function(req, res) {
   upload(req, res, function (err) {
    if (err) {
      res.send("an error occurred!");
    }
    res.send(req.files);
   });
  
});

 
var server = app.listen(4000, function() {
    console.log("Listening on port %s...", server.address().port);
});