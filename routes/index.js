const express = require("express");
const router = express.Router();
const passport = require("passport");
const http = require("http");
const Session = require("express-session");
const google = require("googleapis")
const OAuth2 = google.auth.OAuth2;
const plus = google.plus('v1');
const clientId = "482029420663-c9m9hjtdvth4kfmkripn9e3bdgujhjnn.apps.googleusercontent.com";
const clientSecret = "tF_6qIiyM972LdP3m7SH3pcH";
const callbackURL = "http://proyecto15.dis.eafit.edu.co/auth/google/callback";
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("../models/user");

passport.serializeUser(function(user, done) {
          done(null, user.id);
              });

passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
                done(err, user);
                    });
});

passport.use(new GoogleStrategy({

      clientID        : clientId,
          clientSecret    : clientSecret,
              callbackURL     : callbackURL,
},
function(token, refreshToken, profile, done) {
  process.nextTick(function() {
    User.findOne({ 'google.id' : profile.id }, function(err, user) {
      if (err)
         return done(err);
      if (user) {
         return done(null, user);
      } else {
         var newUser          = new User();
         newUser.google.id        = profile.id;
         newUser.google.token     = token;
         newUser.google.username  = profile.displayName;
         newUser.google.email     = profile.emails[0].value;

         newUser.save(function(err) {
           if (err){
             console.log(err);
           }else {
             return done(null, newUser);
           }
          });
      }
    });
  });
}));

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/photos',
    failureRedirect : '/login'
}));

router.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

router.get("/", function (req, res) {
  res.render("landing");
});

router.get("/register", function (req, res) {
  res.render("register");
})

router.post("/register", function (req, res) {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/photos");
    });
  });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/photos",
    failureRedirect: "/login"
  }), function (req, res) {
  });

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/photos");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
