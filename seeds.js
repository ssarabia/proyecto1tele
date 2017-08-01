var mongoose = require("mongoose");
var Photo = require("./models/photo");
var Comment = require("./models/comment");

var data = [
  {
    name : "Jack Rusell",
    source: "http://cdn3-www.dogtime.com/assets/uploads/2009/11/jack-russell-dog-names.jpg",
    description: "Un lindo jack rusell"
  },
  {
    name : "Beagle",
    source: "http://cdn2-www.dogtime.com/assets/uploads/gallery/beagle-puppies/beagle-puppy-4.jpg",
    description: "Un lindo beagle"
  },
  {
    name : "Labrador",
    source: "http://cdn1-www.dogtime.com/assets/uploads/gallery/labrador-retriever-dog-breed-pictures/labrador-retriever-dog-pictures-1.jpg",
    description: "Un lindo labrador"
  }
]

function seedDB(){
  Photo.remove({},function(err){
    if(err){
      console.log(err);
    }
    console.log("Removed all photos!");
    data.forEach(function(seed){
      Photo.create(seed, function(err, photo){
        if(err){
          console.log(err)
        } else {
          console.log("Added a photo")
          Comment.create(
            {
              text: "Que chimba de foto, esta genial",
              author: "Sam"
            }, function(err, comment){
              if(err){
                console.log(err);
              } else{
                photo.comments.push(comment);
                photo.save();
                console.log("Created new comment");
              }
            });
        }
      });
    });
  });
}

module.exports = seedDB;
