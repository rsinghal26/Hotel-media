var express = require("express");
var app  = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Connected..........");
});

app.get("/",function(req,res){
    res.render("landing");
})

var photos = [
        {name:"King penguin",image:"http://cdn2.arkive.org/media/93/939EDA21-DD6E-46EE-BD87-64DF9E7FF859/Presentation.Large/King-penguins-allopreening.jpg"},
        {name:"African grey parrot",image:"http://cdn2.arkive.org/media/9D/9DAA69CF-F5CF-476A-8857-8A1F53897885/Presentation.Large/African-grey-parrot-perched.jpg"},
        {name:"Kakapo",image:"http://cdn1.arkive.org/media/56/5692B0B2-7BCE-40CB-BB19-D48B085CF32E/Presentation.Large/Kakapo-walking.jpg"},
        {name:"Andean flamingo",image:"http://cdn2.arkive.org/media/89/89EB2AF8-CD86-4B14-ADF3-D8B9584B95D0/Presentation.Large/Andean-flamingo-flying.jpg"},
    ]
app.get("/photos",function(req,res){
    res.render("photos",{photos:photos});
})

app.post("/photos",function(req,res){
    var caption = req.body.caption;
    var img = req.body.url;
    var result = {name:caption,image:img};
    photos.push(result);
    res.redirect("/photos");
});

app.get("/photos/addNew",function(req, res) {
    res.render("addNew.ejs");
})