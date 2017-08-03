var express = require("express");
var router = express.Router();
var Photo = require("../models/photo")

router.get("/", function(req,res){
  Photo.find({},function(err, photos){
    if(err){
      console.log(err);
    } else {
      res.render("photos/index", {photos: photos, currentUser: req.user});
    }
  })
});
//Create
router.post("/", isLoggedIn, function(req,res){
  var name = req.body.name;
  var source = req.body.source;
  var description = req.body.description;
  var author = {id: req.user._id, username: req.user.username}
  var newPhoto = {name: name, source: source, description:description, author: author};
  Photo.create(newPhoto, function(err, newlyCreated){
    if (err){
      console.log(err);
    } else{
      res.redirect("/photos")
    }
  });
});

//New
router.get("/new", isLoggedIn, function(req,res){
  res.render("photos/new");
});

//Show
router.get("/:id",function(req,res){
  Photo.findById(req.params.id).populate("comments").exec(function(err, foundPhoto){
    if (err) {
      console.log(err);
    }else {
      console.log(foundPhoto);
      res.render("photos/show", {photo : foundPhoto});
    }
  });
});

router.post("/search", function(req,res){
  Photo.find({'name': {$regex: ".*" + req.body.search + ".*"}}, function(err, photos){
    if(err){
      console.log(err);
    } else {
      res.render("photos/index", {photos:photos})
    }
  })
})


function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
