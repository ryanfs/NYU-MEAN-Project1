{"filter":false,"title":"models.js","tooltip":"/models/models.js","undoManager":{"mark":72,"position":72,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":151,"column":2},"action":"insert","lines":["var mongoose = require(\"mongoose\");","","var PersonSchema = new mongoose.Schema({","  name: String,","  things: [{","    type: mongoose.Schema.ObjectId,","    ref: \"Thing\"","  }],","  numberOfThings: {","    type: Number,","    default: 0","  }","});","","PersonSchema.statics.getOneByName = function(name, cb) {","  this.findOne({","    name: name","  }).populate(\"things\").exec(cb);","};","","PersonSchema.statics.getOneById = function(id, cb) {","  this.findOne({","    _id: id","  }, cb);","};","","PersonSchema.statics.getAll = function(cb) {","  this.find({}).sort(\"name\").exec(cb);","};","","PersonSchema.statics.acquire = function(personId, thingId, cb) {","  Thing.findById(thingId, function(err, _thing) {","    if (_thing.numberInStock <= 0)","      return cb({","        message: \"NONE_IN_STOCK\"","      });","    var qry = {","      _id: personId","    };","    var update = {","      $push: {","        things: thingId","      },","      $inc: {","        numberOfThings: 1","      }","    };","    Person.update(qry, update, function(err) {","      var query = {","        _id: thingId","      };","      var update = {","        $inc: {","          numberOwned: 1,","          numberInStock: -1","        }","      }","      Thing.update(query, update, function() {","        cb();","      });","    });","  });","};","","PersonSchema.statics.returnThing = function(personId, thingId, cb) {","  this.findById(personId, function(err, _person) {","    var index = _person.things.indexOf(thingId);","    if (index == -1)","      return cb({","        message: \"USER_DOES_NOT_OWN\"","      }, null);","    _person.things.splice(index, 1);","    _person.numberOwned = _person.numberOwned + 1;","    _person.save(function(err) {","      var query = {","        _id: thingId","      };","      var update = {","        $inc: {","          numberOwned: -1,","          numberInStock: 1","        }","      };","      Thing.update(query, update, function() {","        cb();","      });","    });","  });","};","","","var Person = mongoose.model(\"Person\", PersonSchema);","","var ThingSchema = new mongoose.Schema({","  name: String,","  numberOwned: {","    type: Number,","    default: 0","  },","  numberInStock: Number","});","","ThingSchema.statics.getOneByName = function(name, cb) {","  this.findOne({","    name: name","  }, cb);","};","","ThingSchema.statics.getOneById = function(id, cb) {","  this.findById(id, cb);","};","","ThingSchema.statics.getAll = function(cb) {","  this.find({}).sort(\"name\").exec(cb);","};","","var Thing = mongoose.model(\"Thing\", ThingSchema);","","function seed(cb) {","  var people = [{","    name: \"Moe\"","  }, {","    name: \"Larry\"","  }, {","    name: \"Curly\"","  }];","  var things = [{","    name: \"Rock\",","    numberInStock: 10","  }, {","    name: \"Paper\",","    numberInStock: 10","  }, {","    name: \"Scissors\",","    numberInStock: 10","  }];","  Person.remove({}, function() {","    Person.create(people, function(err, moe, larry, curly) {","      Thing.remove({}, function() {","        Thing.create(things, function(err, rock, paper, scissors) {","          cb(err, moe, larry, curly, rock, paper, scissors);","        });","      });","    });","  });","}","","module.exports = {","  seed: seed,","  Person: Person,","  Thing: Thing","};"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":151,"column":2},"action":"remove","lines":["var mongoose = require(\"mongoose\");","","var PersonSchema = new mongoose.Schema({","  name: String,","  things: [{","    type: mongoose.Schema.ObjectId,","    ref: \"Thing\"","  }],","  numberOfThings: {","    type: Number,","    default: 0","  }","});","","PersonSchema.statics.getOneByName = function(name, cb) {","  this.findOne({","    name: name","  }).populate(\"things\").exec(cb);","};","","PersonSchema.statics.getOneById = function(id, cb) {","  this.findOne({","    _id: id","  }, cb);","};","","PersonSchema.statics.getAll = function(cb) {","  this.find({}).sort(\"name\").exec(cb);","};","","PersonSchema.statics.acquire = function(personId, thingId, cb) {","  Thing.findById(thingId, function(err, _thing) {","    if (_thing.numberInStock <= 0)","      return cb({","        message: \"NONE_IN_STOCK\"","      });","    var qry = {","      _id: personId","    };","    var update = {","      $push: {","        things: thingId","      },","      $inc: {","        numberOfThings: 1","      }","    };","    Person.update(qry, update, function(err) {","      var query = {","        _id: thingId","      };","      var update = {","        $inc: {","          numberOwned: 1,","          numberInStock: -1","        }","      }","      Thing.update(query, update, function() {","        cb();","      });","    });","  });","};","","PersonSchema.statics.returnThing = function(personId, thingId, cb) {","  this.findById(personId, function(err, _person) {","    var index = _person.things.indexOf(thingId);","    if (index == -1)","      return cb({","        message: \"USER_DOES_NOT_OWN\"","      }, null);","    _person.things.splice(index, 1);","    _person.numberOwned = _person.numberOwned + 1;","    _person.save(function(err) {","      var query = {","        _id: thingId","      };","      var update = {","        $inc: {","          numberOwned: -1,","          numberInStock: 1","        }","      };","      Thing.update(query, update, function() {","        cb();","      });","    });","  });","};","","","var Person = mongoose.model(\"Person\", PersonSchema);","","var ThingSchema = new mongoose.Schema({","  name: String,","  numberOwned: {","    type: Number,","    default: 0","  },","  numberInStock: Number","});","","ThingSchema.statics.getOneByName = function(name, cb) {","  this.findOne({","    name: name","  }, cb);","};","","ThingSchema.statics.getOneById = function(id, cb) {","  this.findById(id, cb);","};","","ThingSchema.statics.getAll = function(cb) {","  this.find({}).sort(\"name\").exec(cb);","};","","var Thing = mongoose.model(\"Thing\", ThingSchema);","","function seed(cb) {","  var people = [{","    name: \"Moe\"","  }, {","    name: \"Larry\"","  }, {","    name: \"Curly\"","  }];","  var things = [{","    name: \"Rock\",","    numberInStock: 10","  }, {","    name: \"Paper\",","    numberInStock: 10","  }, {","    name: \"Scissors\",","    numberInStock: 10","  }];","  Person.remove({}, function() {","    Person.create(people, function(err, moe, larry, curly) {","      Thing.remove({}, function() {","        Thing.create(things, function(err, rock, paper, scissors) {","          cb(err, moe, larry, curly, rock, paper, scissors);","        });","      });","    });","  });","}","","module.exports = {","  seed: seed,","  Person: Person,","  Thing: Thing","};"]},{"start":{"row":0,"column":0},"end":{"row":142,"column":2},"action":"insert","lines":["var mongoose = require(\"mongoose\");","","var PlaceSchema = new mongoose.Schema({","  name: String,","  numberOfTimesFavorited: {","    type: Number,","    default: 0","  }","});","","var PersonSchema = new mongoose.Schema({","  favoritePlaces: [{","    type: mongoose.Schema.ObjectId,","    ref: \"Place\"","  }],","  numberOfFavoritesPlaces: {","    type: Number,","    default: 0","  }","});","","PlaceSchema.statics.getOneByName = function(name, cb) {","  this.findOne({","    name: name","  }).populate(\"places\").exec(cb);","};","","PlaceSchema.statics.getOneById = function(id, cb) {","  this.findOne({","    _id: id","  }, cb);","};","","PlaceSchema.statics.getAll = function(cb) {","  this.find({}).sort(\"name\").exec(cb);","};","","PlaceSchema.statics.getAllFavoritedPlaces = function(cb) {","  this.find({\"numberOfTimesFavorited\": {$gt: 0}}).exec(cb)","};","","PlaceSchema.statics.getAllUnfavoritedPlaces = function(cb) {","  this.find({\"numberOfTimesFavorited\": {$lte: 0}}).exec(cb)","};","","PersonSchema.statics.findAllWhoFavoritedPlace = function(placeId, cb){","  this.find({","    favoritePlaces: placeId","  }, cb);","}","","PersonSchema.statics.addPlace = function(personId, placeId, cb) {","  Person.findById(personId, function(err, _person) {","    if (_person.find({\"favoritePlaces\": placeId}))","      return cb({","        message: \"Already Added\"","      });","    var qry = {","      _id: personId","    };","    var update = {","      $push: {","        place: placeId","      },","      $inc: {","        numberOfFavoritesPlaces: 1","      }","    };","    Place.update(qry, update, function(err) {","      var query = {","        _id: placeId","      };","      var update = {","        $inc: {","          numberOfTimesFavorited: 1,","        }","      }","      Person.update(query, update, function() {","        return cb({","          _person","        });","      });","    });","  });","};","","PersonSchema.statics.removePlace = function(personId, placeId, cb) {","  Person.findById(personId, function(err, _person) {","    if (_person.find({\"favoritePlaces\": placeId}) == false)","      return cb({","        message: \"Person does not have that place\"","      });","    var qry = {","      _id: personId","    };","    var update = {","      $pop: {","        place: placeId","      },","      $inc: {","        numberOfFavoritesPlaces: -1","      }","    };","    Place.update(qry, update, function(err) {","      var query = {","        _id: placeId","      };","      var update = {","        $inc: {","          numberOfTimesFavorited: -1,","        }","      }","      Person.update(query, update, function() {","        return cb({","          _person","        });","      });","    });","  });","};","","var Person = mongoose.model(\"Person\", PersonSchema);","","var Place = mongoose.model(\"Place\", PlaceSchema);","","function seed(cb) {","  var places = [{","    name: \"New York\"","  }, {","    name: \"Paris\"","  }, {","    name: \"London\"","  }];","  Place.create(places, function(err, new_york, paris, london) {","    cb(err, new_york, paris, london);","  });","}","","module.exports = {","  seed: seed,","  Person: Person,","  Place: Place","};"]}]}],[{"group":"doc","deltas":[{"start":{"row":80,"column":9},"end":{"row":80,"column":10},"action":"insert","lines":["}"]}]}],[{"group":"doc","deltas":[{"start":{"row":80,"column":9},"end":{"row":80,"column":10},"action":"remove","lines":["}"]}]}],[{"group":"doc","deltas":[{"start":{"row":80,"column":8},"end":{"row":80,"column":9},"action":"remove","lines":["}"]}]}],[{"group":"doc","deltas":[{"start":{"row":80,"column":8},"end":{"row":80,"column":9},"action":"insert","lines":["}"]}]}],[{"group":"doc","deltas":[{"start":{"row":38,"column":58},"end":{"row":38,"column":59},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":59},"end":{"row":42,"column":60},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":49,"column":1},"end":{"row":49,"column":2},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":76,"column":7},"end":{"row":76,"column":8},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":111,"column":7},"end":{"row":111,"column":8},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":10},"end":{"row":79,"column":17},"action":"remove","lines":["_person"]},{"start":{"row":79,"column":10},"end":{"row":79,"column":11},"action":"insert","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":11},"end":{"row":79,"column":13},"action":"insert","lines":["\"\""]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":11},"end":{"row":79,"column":13},"action":"remove","lines":["\"\""]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":11},"end":{"row":79,"column":13},"action":"insert","lines":["\"\""]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":12},"end":{"row":79,"column":13},"action":"remove","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":11},"end":{"row":79,"column":12},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":12},"end":{"row":79,"column":13},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":13},"end":{"row":79,"column":14},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":14},"end":{"row":79,"column":15},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":15},"end":{"row":79,"column":16},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":16},"end":{"row":79,"column":17},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":17},"end":{"row":79,"column":18},"action":"remove","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":11},"end":{"row":79,"column":17},"action":"remove","lines":["string"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":10},"end":{"row":79,"column":11},"action":"remove","lines":["\""]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":10},"end":{"row":79,"column":11},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":11},"end":{"row":79,"column":12},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":12},"end":{"row":79,"column":13},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":13},"end":{"row":79,"column":14},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":10},"end":{"row":79,"column":14},"action":"remove","lines":["mess"]},{"start":{"row":79,"column":10},"end":{"row":79,"column":17},"action":"insert","lines":["message"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":10},"end":{"row":79,"column":17},"action":"remove","lines":["message"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":10},"end":{"row":79,"column":11},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":11},"end":{"row":79,"column":12},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":12},"end":{"row":79,"column":13},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":13},"end":{"row":79,"column":14},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":14},"end":{"row":79,"column":15},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":15},"end":{"row":79,"column":16},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":16},"end":{"row":79,"column":17},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":17},"end":{"row":79,"column":18},"action":"insert","lines":[":"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":18},"end":{"row":79,"column":19},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":19},"end":{"row":79,"column":20},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":20},"end":{"row":79,"column":21},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":21},"end":{"row":79,"column":22},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":22},"end":{"row":79,"column":23},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":23},"end":{"row":79,"column":24},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":24},"end":{"row":79,"column":25},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":25},"end":{"row":79,"column":26},"action":"insert","lines":["'"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":19},"end":{"row":79,"column":20},"action":"insert","lines":["'"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":10},"end":{"row":79,"column":27},"action":"remove","lines":["message: 'string'"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":10},"end":{"row":79,"column":11},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":11},"end":{"row":79,"column":12},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":12},"end":{"row":79,"column":13},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":13},"end":{"row":79,"column":14},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":14},"end":{"row":79,"column":15},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":15},"end":{"row":79,"column":16},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":16},"end":{"row":79,"column":17},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":10},"end":{"row":79,"column":11},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":10},"end":{"row":79,"column":11},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":11},"end":{"row":79,"column":12},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":12},"end":{"row":79,"column":13},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":13},"end":{"row":79,"column":14},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":14},"end":{"row":79,"column":15},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":15},"end":{"row":79,"column":16},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":16},"end":{"row":79,"column":17},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":79,"column":17},"end":{"row":79,"column":18},"action":"insert","lines":[":"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":9},"end":{"row":114,"column":10},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":10},"end":{"row":114,"column":11},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":11},"end":{"row":114,"column":12},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":12},"end":{"row":114,"column":13},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":13},"end":{"row":114,"column":14},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":14},"end":{"row":114,"column":15},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":15},"end":{"row":114,"column":16},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":16},"end":{"row":114,"column":17},"action":"insert","lines":[":"]}]}]]},"ace":{"folds":[],"scrolltop":1610,"scrollleft":0,"selection":{"start":{"row":114,"column":17},"end":{"row":114,"column":17},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1427922352800,"hash":"dc748db8bd589efe9072b4c04ca61fcd479d4cd4"}