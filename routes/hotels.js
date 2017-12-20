var express = require("express");
var router  = express.Router({mergeParams:true});
var hotl    = require("../models/hotel");
var middleWareObj = require("../middleware");

router.get("/",function(req,res){
    hotl.find({},function(err,allHotel){
        if(err){
            
            console.log(err);
        }else{
            res.render("hotel/index",{hotels: allHotel});
        }
    });
});

//Add new post----------------------------
router.post("/",middleWareObj.isLoggedin,function(req,res){
    var caption = req.body.caption;
    var img = req.body.url;
    var dec = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var result = {name:caption, image:img, description:dec, author:author};
   hotl.create(result,function(err,success){
        if(err){
            console.log(err);
        }else{
            req.flash("success","successfully added" + success.name);
            res.redirect("/hotels");
        }
    });
});

router.get("/addNew",middleWareObj.isLoggedin,function(req, res) {
    res.render("hotel/addNew.ejs");
});

// Show more page----------------------------
router.get("/:id",function(req, res) {
     hotl.find({},function(err,allHotel){
        if(err){
            console.log(err);
        }else{
           hotl.findById(req.params.id).populate("comments").exec(function(err,fHotel){
                if(err){
                    console.log(err);
                }else{
                    //console.log(fHotel);
                    res.render("hotel/showMore",{hotel: fHotel,hotels:allHotel});
                }
            });
        }
    });
     
})

//Edit and update post----------------------------
router.get("/:id/edit", middleWareObj.givePermissions,function(req, res) {
    hotl.findById(req.params.id,function(err,foundHotel){
        if(err){
            console.log(err);
        }else{
             req.flash("erreo","You don't have permission to do that");
             res.render("hotel/edit",{hotel:foundHotel});
        }
    });
});

router.put("/:id", middleWareObj.givePermissions,function(req,res){
    hotl.findByIdAndUpdate(req.params.id,req.body.hotel,function(err,update){
        if(err){
            console.log(err);
            res.redirect("/hotels");
        }else{
            res.redirect("/hotels/"+req.params.id);
        }
    });
});

//Delete post----------------------------
router.delete("/:id", middleWareObj.givePermissions,function(req,res){
    hotl.findByIdAndRemove(req.params.id,function(err,deleteHotel){
        if(err){
            console.log(err);
            req.flash("error","Something was wrong, Please try again");
            res.redirect("/hotels");
        }else{
            req.flash("success","Post successfully deleted");
            res.redirect("/hotels");
        }
    });
});

module.exports = router;