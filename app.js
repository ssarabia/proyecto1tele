const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const methodOverride = require("method-override");

const User = require("./models/user")
const Photo = require("./models/photo");
const Comment = require("./models/comment")

const commentRoutes = require("./routes/comments"),
  photoRoutes = require("./routes/photos"),
  authRoutes = require("./routes/index");

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://mongo1:27017,mongo2:27017,mongo3:27017/proyecto?replicaSet=replica1");
mongoose.Promise = global.Promise;
//app.use(express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("/mnt/glusterfs/public/uploads"));
app.use(methodOverride("_method"));

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

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(authRoutes);
app.use("/photos", photoRoutes);
app.use("/photos/:id/comments", commentRoutes);

app.listen(PORT, function () {
  console.log("Proyecto corriendo en el puerto " + PORT + " :v");
});
