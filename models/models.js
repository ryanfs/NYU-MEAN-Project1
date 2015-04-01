var mongoose = require("mongoose");

var PlaceSchema = new mongoose.Schema({
  name: String,
  numberOfTimesFavorited: {
    type: Number,
    default: 0
  }
});

var PersonSchema = new mongoose.Schema({
  favoritePlaces: [{
    type: mongoose.Schema.ObjectId,
    ref: "Place"
  }],
  numberOfFavoritesPlaces: {
    type: Number,
    default: 0
  }
});

PlaceSchema.statics.getOneByName = function(name, cb) {
  this.findOne({
    name: name
  }).populate("places").exec(cb);
};

PlaceSchema.statics.getOneById = function(id, cb) {
  this.findOne({
    _id: id
  }, cb);
};

PlaceSchema.statics.getAll = function(cb) {
  this.find({}).sort("name").exec(cb);
};

PlaceSchema.statics.getAllFavoritedPlaces = function(cb) {
  this.find({"numberOfTimesFavorited": {$gt: 0}}).exec(cb);
};

PlaceSchema.statics.getAllUnfavoritedPlaces = function(cb) {
  this.find({"numberOfTimesFavorited": {$lte: 0}}).exec(cb);
};

PersonSchema.statics.findAllWhoFavoritedPlace = function(placeId, cb){
  this.find({
    favoritePlaces: placeId
  }, cb);
};

PersonSchema.statics.addPlace = function(personId, placeId, cb) {
  Person.findById(personId, function(err, _person) {
    if (_person.find({"favoritePlaces": placeId}))
      return cb({
        message: "Already Added"
      });
    var qry = {
      _id: personId
    };
    var update = {
      $push: {
        place: placeId
      },
      $inc: {
        numberOfFavoritesPlaces: 1
      }
    };
    Place.update(qry, update, function(err) {
      var query = {
        _id: placeId
      };
      var update = {
        $inc: {
          numberOfTimesFavorited: 1,
        }
      };
      Person.update(query, update, function() {
        return cb({
          message: _person
        });
      });
    });
  });
};

PersonSchema.statics.removePlace = function(personId, placeId, cb) {
  Person.findById(personId, function(err, _person) {
    if (_person.find({"favoritePlaces": placeId}) == false)
      return cb({
        message: "Person does not have that place"
      });
    var qry = {
      _id: personId
    };
    var update = {
      $pop: {
        place: placeId
      },
      $inc: {
        numberOfFavoritesPlaces: -1
      }
    };
    Place.update(qry, update, function(err) {
      var query = {
        _id: placeId
      };
      var update = {
        $inc: {
          numberOfTimesFavorited: -1,
        }
      };
      Person.update(query, update, function() {
        return cb({
         message: _person
        });
      });
    });
  });
};

var Person = mongoose.model("Person", PersonSchema);

var Place = mongoose.model("Place", PlaceSchema);

function seed(cb) {
  var places = [{
    name: "New York"
  }, {
    name: "Paris"
  }, {
    name: "London"
  }];
  Place.create(places, function(err, new_york, paris, london) {
    cb(err, new_york, paris, london);
  });
}

module.exports = {
  seed: seed,
  Person: Person,
  Place: Place
};