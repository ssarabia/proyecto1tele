var express = require("express");
var router = express.Router({mergeParams: true});
var Photo = require("../models/photo")
var Comment = require("../models/comment")

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


router.get("/new", isLoggedIn, function(req, res){
  Photo.findById(req.params.id, function(err, photo){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {photo:photo});
    }
  })
});


router.post("/", isLoggedIn, function(req,res){
  Photo.findById(req.params.id, function(err, photo){
    if(err){
      console.log(err);
      redirect("/campgrounds")
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          photo.comments.push(comment);
          photo.save();
          res.redirect("/photos/" + photo._id);
        }
      })
    }
  })
});



module.exports = router;
