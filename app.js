var express = require('express');
var esession = require('express-session');
var cookieParser = require('cookie-parser');
var session = require('client-sessions');
var auth = require('../rhume-app-master/middleware/auth');
// var angular = require("angular");
var $ = require("jquery");
var azure = require('../rhume-app-master/api/azure');
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var axios = require("axios");



app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
//app.use(expressValidator());
app.use('/scripts', express.static(__dirname + 'rhume-app/node_modules/tether/dist/js/tether.min.js'));
app.use('/scripts', express.static(__dirname + 'rhume-app/node_modules/popper.js/dist/popper.min.js'));
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));

 


// app.use(function(req,res,next){
//     app.locals.user = req.session.user;
//     next();
// })


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
    auth(username,password,res);
    req.session.username = username;
    req.session.password = password;
   
})

app.get("/home",function(req,res){
    if(req.session.username){
        res.render("/");
    }else{
        res.render("login");
    }
    
    
   // console.log(app.locals.user);
})

app.get("/book", function(req,res){
    if(req.session.username){
        res.render("book");
    }else{
        res.render("login");
    }
    
})

app.get("/groups", function(req,res){
    if(req.session.username){
        res.render("groups", {
            groups : studyGroups
        });
    }else{
        res.render("login");
    }

})

app.get("/test", function(req,res){
    if(req.session.username){
        res.render("test", {
            groups : studyGroups
        });
    }else{
        res.render("login");
    }

})

app.post("/book", function(req, res){

});

app.get("/download", function(req,res){
    if(req.session.username){
        res.render("download");
    }else{
        res.render("login");
    }
})

app.get("/spaces", function(req,res){
    if(req.session.username){
        res.render("spaces");
    }else{
        res.render("login");
    }
    
})

app.listen(process.env.PORT, process.env.IP, function(){
     console.log("SERVER START");
});
app.listen(3000);



