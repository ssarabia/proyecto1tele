var express = require("express");
var router = express.Router();
var Photo = require("../models/photo")

router.get("/", function (req, res) {
  console.log(req.user);
  if (req.user) {
    Photo.find({ $or: [{ "publico": "true" }, { $and: [{ "publico": { $nin: "true" } }, { "author.id": req.user._id }] }] }, function (err, photos) {
      if (err) {
        console.log(err);
      } else {
        res.render("photos/index", { photos: photos, currentUser: req.user });
      }
    })
  } else {
    Photo.find({ "publico": "true" }, function (err, photos) {
      if (err) {
        console.log(err);
      } else {
        res.render("photos/index", { photos: photos, currentUser: req.user });
      }
    });
  }
});

router.post("/", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var source = req.body.source;
  var description = req.body.description;
  var author = { id: req.user._id, username: req.user.username };
  var publico = req.body.publico;
  var newPhoto = { name: name, source: source, description: description, author: author, publico: publico };
  console.log(newPhoto);
  Photo.create(newPhoto, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/photos")
    }
  });
});

router.get("/new", isLoggedIn, function (req, res) {
  res.render("photos/new");
});

router.get("/:id", function (req, res) {
  Photo.findById(req.params.id).populate("comments").exec(function (err, foundPhoto) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundPhoto);
      res.render("photos/show", { photo: foundPhoto });
    }
  });
});

router.post("/search", function (req, res) {
  Photo.find({ 'name': { $regex: ".*" + req.body.search + ".*" } }, function (err, photos) {
    if (err) {
      console.log(err);
    } else {
      res.render("photos/index", { photos: photos })
    }
  })
})

router.get("/:id/edit", function (req, res) {
  Photo.findById(req.params.id, function (err, photo) {
    if (err) {
      res.redirect("/photos")
    } else {
      res.render("photos/edit", { photo: photo });
    }
  });
});

router.put("/:id", function (req, res) {
  Photo.findByIdAndUpdate(req.params.id, req.body.photo, function (err, photo) {
    if (err) {
      res.redirect("/photos");
    } else {
      res.redirect("/photos/" + req.params.id);
    }
  });
});

router.delete("/:id", function (req, res) {
  Photo.findByIdAndRemove(req.params.id, function (err) {
    res.redirect("/photos");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;