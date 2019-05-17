

var mongoose = require('mongoose');

var plantSchema = new mongoose.Schema({
  code: String,
  name: String,
  // plantType: ObjectId,
  plantType: String,
  created_at: Date,
  height: Number,
  health: Number,
  waterStored: Number,
  spawned: Boolean
}, { collection : 'plants' });

var Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
