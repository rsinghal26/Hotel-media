var express = require("express");
var router  = express.Router({mergeParams:true});
var hotl    = require("../models/hotel");
var comment = require("../models/comment");
var middleWareObj = require("../middleware");

router.get("/new",middleWareObj.isLoggedin,function(req, res) {
    hotl.findById(req.params.id,function(err,hotel){
        if(err){
            console.log(err);
        }else{
            res.render("comment/addNew",{hotel:hotel});
        }
    });
});

router.post("/",middleWareObj.isLoggedin,function(req, res) {
    comment.create(req.body.comment,function(err,comment1){
        if(err){
            console.log(err);
        }else{
            hotl.findById(req.params.id,function(err, hotel) {
                if(err){
                    console.log(err);
                }else{
                    comment1.author.id = req.user._id;
                    comment1.author.username = req.user.username;
                    comment1.save();
                    hotel.comments.push(comment1);
                    hotel.save();
                    req.flash("success","comment successfully added");
                    res.redirect("/hotels/"+req.params.id);
                }
            });
        }
    });
});
//Edit and update comment-------------------------------
router.get("/:comment_id/edit",middleWareObj.givePermissionsForComments,function(req,res){
    comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err){
            console.log(err);
        }else{
            res.render("comment/edit",{hotel_id:req.params.id,comment:foundComment});
        }
    });            
});

router.put("/:comment_id",middleWareObj.givePermissionsForComments,function(req,res){
   comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err, updateComment) {
       if(err){
           console.log(err);
       }else{
           req.flash("success","comment successfully edited");
           res.redirect("/hotels/"+req.params.id);
       }
   }); 
    
});

//Delete a comment--------------------------------------

router.delete("/:comment_id",middleWareObj.givePermissionsForComments,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,function(err,deleteComment){
        if(err){
            req.flash("error","Something was wrong");
            res.redirect("/hotels/"+req.params.id);
        }else{
            req.flash("success","comment successfully deleted");
            res.redirect("/hotels/"+req.params.id);
        }
    });
});

module.exports = router;