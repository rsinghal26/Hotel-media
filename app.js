var express = require("express"),
    app  = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
//MONGODB---------------------------------------------------    
mongoose.connect("mongodb://localhost/hotel_app");
var hotelSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

var hotl = mongoose.model("hotel",hotelSchema);



//MONGODB CLOSE---------------------------------------------------

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Connected..........");
});

app.get("/",function(req,res){
    res.render("landing");
})

app.get("/hotels",function(req,res){
    hotl.find({},function(err,allHotel){
        if(err){
            console.log(err);
        }else{
            res.render("hotels",{hotels: allHotel});
        }
    });
})

app.post("/hotels",function(req,res){
    var caption = req.body.caption;
    var img = req.body.url;
    var dec = req.body.desc;
    var result = {name:caption,image:img,description:dec};
   hotl.create(result,function(err,success){
        if(err){
            console.log(err);
        }else{
            res.redirect("/hotels");
        }
    });
});

app.get("/hotels/addNew",function(req, res) {
    res.render("addNew.ejs");
})

app.get("/hotels/:id",function(req, res) {
     hotl.findById(req.params.id,function(err,fHotel){
        if(err){
            console.log(err);
        }else{
            res.render("showMore",{hotel: fHotel});
        }
    });
})
