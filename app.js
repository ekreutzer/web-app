//var azure = require('../rhume-app-master/api/azure');
var express = require("express");
var auth = require('../rhume-app-master/middleware/auth');
// var angular = require("angular");
var $ = require("jquery");
// window.Popper = require('popper.js');

// var particlesJS = require("particlesjs");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
var axios = require("axios");
app.use('/scripts', express.static(__dirname + 'rhume-app/node_modules/tether/dist/js/tether.min.js'));
app.use('/scripts', express.static(__dirname + 'rhume-app/node_modules/popper.js/dist/popper.min.js'));



var studyGroups=[
    {name:"NR 242", members:"8", topic:"Natural Resources", leader:"Joe Shmo", num:"1"},
    {name:"BIO 004", members:"15", topic:"Biology", leader:"Joe Shmo", num:"2"},
    {name:"CS 124", members:"9", topic:"Algorithms", leader:"Joe Shmo", num: "3"},
    {name:"HST 015", members:"2", topic:"Russian History", leader:"Karl Marx", num: "4"},
    {name:"GEOL 001", members:"7", topic:"Geology", leader:"John Schist", num: "5"},
    {name:"CDAE 124", members:"5", topic:"Public Communciation", leader:"Nick Colias", num: "6"},
    ];

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */

app.set("view engine", "ejs");

//app.use('/api/azure');
// app.use(require('./middleware/auth'));

app.get("/", function(req, res){
    res.render("login");
    
});

app.get("/login", function(req, res){
    res.render('login');
});

app.post('/auth', function(req, res){
    var username = req.body.email;
    var password = req.body.password;
    console.log(username);
    console.log(password);
    auth(username,password,res);
})

app.get("/home",function(req,res){
    res.render("home");
    console.log(req.body.user);
})

app.get("/book", function(req,res){
    res.render("book");
})

app.get("/groups", function(req,res){
    res.render("groups", {
        groups : studyGroups
    });
})

app.get("/test", function(req,res){
    res.render("test", {
        groups : studyGroups
    });
})

app.post("/book", function(req, res){

});

app.get("/download", function(req,res){
    res.render("download");
})

app.get("/spaces", function(req,res){
    res.render("spaces");
})

app.listen(process.env.PORT, process.env.IP, function(){
     console.log("SERVER START");
});
app.listen(3000);

