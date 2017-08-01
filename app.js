var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local")
var User = require("./models/user")
var Photo = require("./models/photo");
var seedDB = require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/proyecto", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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


app.get("/", function(req,res){
  res.render("landing");
});

//Index
app.get("/photos", function(req,res){
  Photo.find({},function(err, photos){
    if(err){
      console.log(err);
    } else {
      res.render("index", {photos: photos});
    }
  })
});
//Create
app.post("/photos", function(req,res){
  var name = req.body.name;
  var source = req.body.source;
  var description = req.body.description;
  var newPhoto = {name: name, source: source, description:description};
  console.log(source);
  Photo.create(newPhoto, function(err, newlyCreated){
    if (err){
      console.log(err);
    } else{
      res.redirect("/photos")
    }
  });
});

//New
app.get("/photos/new",function(req,res){
  res.render("new.ejs");
});

//Show
app.get("/photos/:id",function(req,res){
  Photo.findById(req.params.id).populate("comments").exec(function(err, foundPhoto){
    if (err) {
      console.log(err);
    }else {
      console.log(foundPhoto);
      res.render("show", {photo : foundPhoto});
    }
  });
});

app.get("/register", function(req, res){
  res.render("register");
})

app.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/photos");
    });
  });
});

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", passport.authenticate("local",
  {
    successRedirect: "/photos",
    failureRedirect: "/login"
  }), function(req, res){
});

app.get("/logout", function(req,res){
  req.logout();
  res.redirect("/photos")
})


app.listen(3000, function(){
  console.log("Proyecto corriendo en el puerto 3000")
});
