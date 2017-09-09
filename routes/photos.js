const express = require("express");
const Photo   = require("../models/photo")
const path    = require('path');
const multer  = require('multer');
const fs      = require('fs');
const router  = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({storage: storage});

router.get("/", function (req, res) {
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

router.post("/", upload.single('source'), isLoggedIn, function (req, res) {
  const newPhoto = {
    name: req.body.name,
    source: req.file.filename,
    description: req.body.description,
    author: { id: req.user._id, username: req.user.username },
    publico: req.body.publico
  };
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
