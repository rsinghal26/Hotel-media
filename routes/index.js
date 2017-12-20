var express  = require("express");
var router   = express.Router();
var user     = require("../models/user");
var passport = require("passport");

router.get("/signUp",function(req, res) {
    res.render("signUp");
})

router.post("/signUp",function(req, res) {
    var newUser = new user({username:req.body.username});
    user.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            return res.redirect("/signUp");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to hotels media"+ user.username);
            res.redirect("/hotels");
        });
    });
});

router.get("/login",function(req, res) {
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
        successRedirect: "/hotels",
        failureRedirect: "/login"
}),function(req,res){});

router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Successfully logged out");
    res.redirect("/hotels");
});

module.exports = router;