var middleWareObj = {};
var hotl = require("../models/hotel");
var comment = require("../models/comment");

middleWareObj.isLoggedin = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");
};

middleWareObj.givePermissions = function(req,res,next){
    if(req.isAuthenticated()){
        hotl.findById(req.params.id,function(err,foundHotel){
            if(err){
                req.flash("error","Hotel not found");
                console.log(err);
                res.redirect("back");
            }else{
                if(foundHotel.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","You need to be logged in to do that!");
        res.redirect("back");
    }
};

middleWareObj.givePermissionsForComments = function(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","You need to be logged in to do that!");
        res.redirect("back");
    }
};

module.exports = middleWareObj;