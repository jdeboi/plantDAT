

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

plantSchema.statics.create = function (type, callback) {
  let num = Plant.count((err, count) => {
    if (err) throw err;
    var plant = new Plant({
      x: 0.5,
      y: 0.5,
      color: getRandomColor(),
      plantType: type,
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
    plant.save(callback);
  });

}

function getRandomColor() {
  let colors = ["#1fe226", "#ff1990", "#f49e42"];
  let index = Math.floor(Math.random()*colors.length);
  return colors[index];
}

var Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
