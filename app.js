var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    comment                 = require("./models/comment"),
    flash                   = require("connect-flash"),
    hotl                    = require("./models/hotel"),
    user                    = require("./models/user"),
    seedDB                  = require("./seeds"),
    methodOverride          = require("method-override");

var hotelRoutes   = require("./routes/hotels"),
    commentRoutes = require("./routes/comments"),
    indexRoutes   = require("./routes/index");
    
mongoose.Promise = global.Promise; 
mongoose.connect("mongodb://localhost/hotel_app");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public")); //find the stylesheets in public dir
app.use(methodOverride("_method"));
//seedDB();
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Connected..........");
});

app.use(require("express-session")({
    secret: "taj is the one the famous hotel in india",
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); 

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(flash());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/hotels",hotelRoutes);
app.use("/hotels/:id/comment",commentRoutes);
app.use("/",indexRoutes);

app.get("/",function(req,res){ 
    res.render("landing");
});

