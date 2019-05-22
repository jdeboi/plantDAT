

var mongoose = require('mongoose');

var plantSchema = new mongoose.Schema({

  x: Number,
  y: Number,
  color: String,
  // name: String,
  // plantType: ObjectId,
  plantType: String,
  created_at: Date,
  height: Number,
  spawned: Boolean,

  code: String,
  health: Number,
  growthRate: Number,
  waterStored: Number,
  sunlight: Number,
  water: Number,
  drainage: Number

}, { collection : 'plants' });

plantSchema.statics.create = function (plant, callback) {
  let name = "";
  if (plant.short_name == "beauty") {
    name = "Beauty Berry";
  }
  else if (plant.short_name == "clasping") {
    name = "Clasping Cone Flower";
  }
  else if (plant.short_name == "stokes") {
    name = "Stokes Aster";
  }
  else if (plant.short_name == "lizard") {
    name = "Clasping Cone Flower";
  }
  else if (plant.short_name == "obedient") {
    name = "Obedient Plant";
  }
  let num = Plant.count((err, count) => {
    if (err) throw err;
    var newplant = new Plant({
      x: plant.x,
      y: plant.y,
      color: getRandomColor(),
      plantType: name,
      created_at: new Date(),
      height: 0,
      spawned: true,
      code: count,
      health: 1.0,
      growthRate: 1.0,
      waterStored: 0,
      sunlight: 0.5,
      water: 0.5,
      drainage: 0.5,

    });
    newplant.save(callback);
  });

}

function getRandomColor() {
  let colors = ["#1fe226", "#ff1990", "#f49e42"];
  let index = Math.floor(Math.random()*colors.length);
  return colors[index];
}

var Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
