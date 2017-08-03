var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local")
var User = require("./models/user")
var Photo = require("./models/photo");
var Comment = require("./models/comment")
var seedDB = require("./seeds");

var commentRoutes =   require("./routes/comments"),
    photoRoutes   =   require("./routes/photos"),
    authRoutes    =   require("./routes/index");
// seedDB();



mongoose.connect("mongodb://localhost/proyecto", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
  secret: "Voy a sacar cinco en el proyecto",
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use(authRoutes);
app.use("/photos", photoRoutes);
app.use("/photos/:id/comments", commentRoutes);




app.listen(3000, function(){
  console.log("Proyecto corriendo en el puerto 3000")
});
